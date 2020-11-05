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

  postRespuestas(respuestas: any) {
    const uri = `api/Orden/respuestas`;
    return this.http.post(this.baseUrl + uri, respuestas);
  }

  getPreguntas(idOrden: number) {
    const uri = `/api/Orden/preguntas/${idOrden}`;
    return this.http.get(this.baseUrl + uri);
  }

  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || "", Validators.required)
        : new FormControl(question.value || "");
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
    const questions: QuestionBase<string>[] = [];
    preguntas.forEach((pregunta) => {
      switch (pregunta.idTipoPreguntaNavigation.descripcion) {
        case "multiple":
          questions.push(
            new DropdownQuestion({
              key: pregunta.idPregunta,
              label: pregunta.descripcion,
              options: pregunta.opcionPregunta,
              order: pregunta.idPregunta,
            })
          );
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
              order: pregunta.idPregunta,
            })
          );
          break;
      }
    });
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
