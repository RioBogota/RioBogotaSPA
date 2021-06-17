import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { QuestionBase } from "src/app/orden/consulta/encuesta/encuesta.model";
import { DropdownQuestion } from "src/app/orden/consulta/encuesta/question-dropdown";
import { TextboxQuestion } from "src/app/orden/consulta/encuesta/question-textbox";

@Injectable({
  providedIn: "root",
})
export class OrdenService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getOrdenes(): Observable<any> {
    const uri = `api/Orden/ordenes`;
    return this.http.get(this.baseUrl + uri);
  }

  getMunicipios(): Observable<any> {
    const uri = `api/Orden/municipios`;
    return this.http.get(this.baseUrl + uri);
  }

  getRespuestas(
    idMunicipio: number,
    idOrden: number,
    usuario: string
  ): Observable<any> {
    const uri = `api/Orden/respuestas/${idMunicipio}/${idOrden}/${usuario}`;
    return this.http.get(this.baseUrl + uri);
  }

  isValidUser(usuario) {
    const uri = `api/Orden/respuestas/valido/${usuario}`;
    return this.http.get(this.baseUrl + uri);
  }

  putArchivo(nombreArchivo: string, idArchivo: string, idRespuesta: number) {
    const uri = `api/Orden/respuesta/archivo?nombreArchivo=${encodeURI(
      nombreArchivo
    )}&idArchivo=${idArchivo}&idRespuesta=${idRespuesta}`;
    return this.http.post(this.baseUrl + uri, null);
  }

  postRespuestas(respuestas: any) {
    const uri = `api/Orden/respuestas`;
    return this.http.post(this.baseUrl + uri, respuestas);
  }

  getPreguntas(idOrden: number) {
    const uri = `/api/Orden/preguntas/${idOrden}`;
    return this.http.get(this.baseUrl + uri);
  }

  toFormGroup(questions: QuestionBase<any>[]) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(
            question.value || "",
            Validators.compose([
              Validators.required,
              Validators.maxLength(question.max),
              Validators.minLength(question.minlength),
            ])
          )
        : new FormControl(
            question.value || "",
            Validators.maxLength(question.max)
          );
    });
    return new FormGroup(group);
  }

  convertirTipo(tipo) {
    switch (tipo) {
      case "text":
        return "text";
      case "fecha":
        return "date";
      case "numero":
        return "number";
      case "moneda":
        return "number";
      case "archivo":
        return "file";
      default:
        break;
    }
  }

  getQuestions(preguntas) {
    const questions: QuestionBase<any>[] = [];
    preguntas.forEach((pregunta) => {
      switch (pregunta.idTipoPreguntaNavigation.descripcion) {
        case "multiple":
          {
            if (
              pregunta.opcionPregunta &&
              pregunta.opcionPregunta.length &&
              pregunta.opcionPregunta[0].idOpcionNavigation.codigo &&
              JSON.parse(sessionStorage.getItem("usuario")).idMunicipio
            ) {
              pregunta.opcionPregunta = pregunta.opcionPregunta.filter(
                (opcion) =>
                  opcion.idOpcion ===
                  JSON.parse(sessionStorage.getItem("usuario")).idMunicipio
              );
            }
            questions.push(
              new DropdownQuestion({
                key: pregunta.idPregunta,
                label: pregunta.descripcion,
                options: pregunta.opcionPregunta.sort((a, b) => {
                  if (
                    a.idOpcionNavigation.descripcion >
                    b.idOpcionNavigation.descripcion
                  ) {
                    return 1;
                  }
                  if (
                    a.idOpcionNavigation.descripcion <
                    b.idOpcionNavigation.descripcion
                  ) {
                    return -1;
                  }
                  if (
                    a.idOpcionNavigation.descripcion ===
                    b.idOpcionNavigation.descripcion
                  ) {
                    return 0;
                  }
                }),
                order: pregunta.idPregunta,
              })
            );
          }
          break;

        default:
          questions.push(
            new TextboxQuestion({
              key: pregunta.idPregunta,
              label: pregunta.descripcion,
              value: "",
              type: this.convertirTipo(
                pregunta.idTipoPreguntaNavigation.descripcion
              ),
              required: pregunta.requerido,
              minlength:
                pregunta.idTipoPreguntaNavigation.descripcion === "moneda"
                  ? 7
                  : 0,
              max: pregunta.longitud,
              order: pregunta.idPregunta,
            })
          );
          break;
      }
    });
    return of(questions);
  }
}
