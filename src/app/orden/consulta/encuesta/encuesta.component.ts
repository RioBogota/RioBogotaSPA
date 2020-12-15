import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { forkJoin } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { OrdenService } from "src/app/services/orden/orden.service";
import { PrincipalService } from "src/app/services/principal/principal.service";
import { Base } from "src/app/shared/base";
import { QuestionBase } from "./encuesta.model";

@Component({
  selector: "app-encuesta",
  templateUrl: "./encuesta.component.html",
  styleUrls: ["./encuesta.component.css"],
})
export class EncuestaComponent extends Base implements OnInit {
  questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payLoad: any;
  ordenes = [];
  ordenSeleccionada: any;
  preguntas: any;
  formData: FormData;
  radicado: string;
  public documento: any = {};
  constructor(
    private ordenService: OrdenService,
    private principalService: PrincipalService,
    private appService: AppService
  ) {
    super();
  }

  ngOnInit() {
    if(!JSON.parse(sessionStorage.getItem("usuario")) || !JSON.parse(sessionStorage.getItem("usuario")).usuario1) {
      this.appService.error('Para ingresar a esta pagina debe iniciar sesion primero');
      return;
    }
    this.ordenService.getOrdenes().subscribe(
      (res) => (this.ordenes = res),
      (err) =>
        this.appService.error(
          "No se pueden obtener las ordenes, intente nuevamente mas tarde"
        )
    );
  }

  obtenerArchivo(event) {
    this.formData = new FormData();
    this.formData.append(
      event.target.files[0].name,
      event.target.files[0],
      event.target.files[0].name
    );
  }

  formatearPreguntas(preguntas) {
    this.preguntas = preguntas;
    this.ordenService.getQuestions(preguntas).subscribe(
      (res) => {
        this.questions = res;
        this.form = this.ordenService.toFormGroup(this.questions);
      },
      (err) =>
        this.appService.error("Se produjo un error al obtener las preguntas")
    );
  }

  seleccionarOrden() {
    this.ordenService.getPreguntas(this.ordenSeleccionada.idOrden).subscribe(
      (res) => this.formatearPreguntas(res),
      (err) =>
        this.appService.error("Se produjo un error al obtener las preguntas")
    );
  }

  onSubmit() {
    this.payLoad = this.form.getRawValue();
    let respuestas = [];
    let municipio = 0;
    this.radicado = `RBOG-${this.ordenSeleccionada.idOrden}-${new Date().toLocaleDateString().substr(0, 10).replace(/\//g, '-')}`;
    for (const key in this.payLoad) {
      if (Object.prototype.hasOwnProperty.call(this.payLoad, key)) {
        const element = this.payLoad[key];
        let pregunta = this.preguntas.find(
          (element) => element.idPregunta === parseInt(key)
        );
        if(pregunta.longitud === -1) {
          municipio = element;
          this.radicado = `${this.radicado}-${element}-${JSON.parse(sessionStorage.usuario).usuario1}`
        }
        if (
          pregunta &&
          pregunta.idTipoPreguntaNavigation &&
          pregunta.idTipoPreguntaNavigation.descripcion
        ) {
          switch (pregunta.idTipoPreguntaNavigation.descripcion) {
            case "texto":
              respuestas.push({
                texto: element.toString(),
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            case "archivo":
              respuestas.push({
                texto: element.toString().split("\\")[
                  element.toString().split("\\").length - 1
                ],
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            case "moneda":
              respuestas.push({
                moneda: element.toString(),
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            case "fecha":
              respuestas.push({
                fecha: element.toString(),
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            case "numero":
              respuestas.push({
                numero: parseInt(element),
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            case "multiple":
              respuestas.push({
                idOpcionPregunta: parseInt(element),
                usuario: JSON.parse(sessionStorage.usuario).usuario1,
                fechaAud: new Date().toLocaleDateString(),
                idPregunta: parseInt(key),
                municipio,
                radicado: this.radicado
              });
              break;
            default:
              break;
          }
        }
      }
    }
    this.ordenService.postRespuestas(respuestas).subscribe(
      (suc) => this.appService.success(`Preguntas guardadas correctamente, numero de radicado ${this.radicado}`),
      (err) =>
        this.appService.error("Se produjo un error al guardar las preguntas")
    );
    if (this.formData) {
      this.unsubscribeOndestroy(
        this.principalService
          .guardarDocumento(
            this.formData,
            this.documento.descripcionDocumento,
            this.ordenSeleccionada.idCarpetaDrive
          )
          .subscribe(
            (result: any) => {
              this.appService.success("Se cargo el archivo correctamente");
            },
            (error) => {
              console.error(error);
              this.appService.error(
                "Se produjo un error al cargar el archivo."
              );
            }
          )
      );
    }
  }
}
