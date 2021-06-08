import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { forkJoin } from "rxjs";
import { AppService } from "src/app/services/app.service";
import { OrdenService } from "src/app/services/orden/orden.service";
import { PrincipalService } from "src/app/services/principal/principal.service";
import { Base } from "src/app/shared/base";
import { QuestionBase } from "./encuesta.model";
import { md5 } from "src/app/shared/md5";
@Component({
  selector: "app-encuesta",
  templateUrl: "./encuesta.component.html",
  styleUrls: ["./encuesta.component.css"],
})
export class EncuestaComponent extends Base implements OnInit {
  questions: QuestionBase<any>[] = [];
  adicionales: QuestionBase<any>[] = [];
  form: FormGroup;
  formAdicional: FormGroup;
  payLoad: any;
  ordenes = [];
  ordenSeleccionada: any;
  preguntas: any;
  formData: FormData;
  fileId = "";
  radicado: string;
  guardando = false;
  public documento: any = {};
  constructor(
    private ordenService: OrdenService,
    private principalService: PrincipalService,
    private appService: AppService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    if (
      !JSON.parse(sessionStorage.getItem("usuario")) ||
      !JSON.parse(sessionStorage.getItem("usuario")).usuario1
    ) {
      this.appService.error(
        "Para ingresar a esta pagina debe iniciar sesion primero"
      );
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
    if (this.formAdicional) {
      this.resetPreguntasAdicionales();
    }
    this.ordenService.getQuestions(preguntas).subscribe(
      (res) => {
        this.questions = res;
        this.form = this.ordenService.toFormGroup(this.questions);
        if (this.formAdicional) {
          this.formAdicional.reset();
        }
      },
      (err) =>
        this.appService.error("Se produjo un error al obtener las preguntas")
    );
  }

  resetPreguntasAdicionales() {
    this.adicionales = [];
    this.formAdicional.reset();
  }

  agregarAdicional(boton: string, orden: number) {
    if (this.formAdicional) {
      let valores = this.formAdicional.getRawValue();
      this.adicionales.forEach(element => {
        element.value = valores[element.key];
      });
    }
    if (orden === 4 && boton === "PSMV") {
      let adicionales = this.adicionales.concat(
        JSON.parse(JSON.stringify(this.questions)).filter((x) => {
          if ([67, 68, 69, 70, 71].includes(x.key)) {
            x.keyAdd = x.key;
            x.key = x.key / Math.random();
            return true;
          }
          return false;
        })
      );
      this.formAdicional = this.ordenService.toFormGroup(adicionales);
      this.adicionales = adicionales;
      return;
    }
    if (orden === 4 && boton === "REPORTE") {
      let adicionales = this.adicionales.concat(
        JSON.parse(JSON.stringify(this.questions)).filter((x) => {
          if ([77, 420].includes(x.key)) {
            x.keyAdd = x.key;
            x.key = x.key / Math.random();
            return true;
          }
          return false;
        })
      );
      this.formAdicional = this.ordenService.toFormGroup(adicionales);
      this.adicionales = adicionales;
      return;
    }
    if (orden === 6 && boton === "MANEJO_ESPECIAL") {
      let adicionales = this.adicionales.concat(
        JSON.parse(JSON.stringify(this.questions)).filter((x) => {
          if ([114, 115, 116, 117, 421].includes(x.key)) {
            x.keyAdd = x.key;
            x.key = x.key / Math.random();
            return true;
          }
          return false;
        })
      );
      this.formAdicional = this.ordenService.toFormGroup(adicionales);
      this.adicionales = adicionales;
      return;
    }
    if (orden === 6 && boton === "PROTECCION_ESPECIAL") {
      let adicionales = this.adicionales.concat(
        JSON.parse(JSON.stringify(this.questions)).filter((x) => {
          if ([119, 120, 121, 122, 123].includes(x.key)) {
            x.keyAdd = x.key;
            x.key = x.key / Math.random();
            return true;
          }
          return false;
        })
      );
      this.formAdicional = this.ordenService.toFormGroup(adicionales);
      this.adicionales = adicionales;
      return;
    }
    if (orden === 7 && boton === "RESTAURACION") {
      let adicionales = this.adicionales.concat(
        JSON.parse(JSON.stringify(this.questions)).filter((x) => {
          if ([137, 138, 139, 140].includes(x.key)) {
            x.keyAdd = x.key;
            x.key = x.key / Math.random();
            return true;
          }
          return false;
        })
      );
      this.formAdicional = this.ordenService.toFormGroup(adicionales);
      this.adicionales = adicionales;
      return;
    }
  }

  seleccionarOrden() {
    this.ordenService.getPreguntas(this.ordenSeleccionada.idOrden).subscribe(
      (res) => this.formatearPreguntas(res),
      (err) =>
        this.appService.error("Se produjo un error al obtener las preguntas")
    );
  }

  onSubmit() {
    this.guardando = true;
    if (!this.formData) {
      let respuestas = this.formatQuestion();
      this.saveQuestions(respuestas);
    } else {
      this.guardando = true;
      this.unsubscribeOndestroy(
        this.principalService
          .guardarDocumento(
            this.formData,
            this.documento.descripcionDocumento,
            this.ordenSeleccionada.idCarpetaDrive
          )
          .subscribe(
            (result: any) => {
              this.fileId = result;
              let respuestas = this.formatQuestion();
              this.saveQuestions(respuestas);
            },
            (error) => {
              console.error(error);
              this.appService.error(
                "Se produjo un error al cargar el archivo."
              );
              this.guardando = false;
            }
          )
      );
    }
  }

  private saveQuestions(respuestas: any[]) {
    this.ordenService.postRespuestas(respuestas).subscribe(
      (suc) => {
        if (!suc) {
          this.appService.error(
            "Se produjo un error al guardar las preguntas."
          );
          this.guardando = false;
          return;
        }
        this.guardando = false;
        this.appService.success(
          `Preguntas guardadas correctamente, numero de radicado ${this.radicado}`
        );
        this.router.navigate(["/"]);
      },
      (err) => {
        this.appService.error("Se produjo un error al guardar las preguntas");
        this.guardando = false;
      }
    );
  }

  getAdicionalValue(rawValue, respuestas, municipio) {
    let retorno = [];
    for (const key in rawValue) {
      if (Object.prototype.hasOwnProperty.call(rawValue, key)) {
        let elemento = this.adicionales.find(
          (adicional) => adicional.key.toString() === key
        );
        if (elemento) {
          let pregunta = this.preguntas.find(
            (element) => element.idPregunta === parseInt(elemento.keyAdd)
          );
          this.getRespuestaFinal(
            pregunta,
            respuestas,
            rawValue[key],
            elemento.keyAdd,
            municipio
          );
        }
      }
    }
    return retorno;
  }

  private formatQuestion() {
    let respuestas = [];
    let municipio = 0;
    this.payLoad = this.form.getRawValue();
    this.radicado = md5(
      `RBOG-${this.ordenSeleccionada.idOrden}-${new Date()
        .toLocaleDateString()
        .substr(0, 10)
        .replace(/\//g, "-")}-${Math.random()}`
    );
    for (const key in this.payLoad) {
      if (Object.prototype.hasOwnProperty.call(this.payLoad, key)) {
        const element = this.payLoad[key];
        let pregunta = this.preguntas.find(
          (element) => element.idPregunta === parseInt(key)
        );
        if (pregunta.longitud === -1) {
          municipio = element;
          this.radicado = md5(
            `${this.radicado}-${element}-${
              JSON.parse(sessionStorage.usuario).usuario1
            }-${Math.random()}`
          );
        }
        if (
          pregunta &&
          pregunta.idTipoPreguntaNavigation &&
          pregunta.idTipoPreguntaNavigation.descripcion
        ) {
          this.getRespuestaFinal(pregunta, respuestas, element, key, municipio);
        }
      }
    }
    if (this.formAdicional) {
      let valued = this.formAdicional.getRawValue();
      this.getAdicionalValue(valued, respuestas, municipio);
    }
    return respuestas;
  }

  private getRespuestaFinal(
    pregunta: any,
    respuestas: any[],
    element: any,
    key: string,
    municipio: number
  ) {
    switch (pregunta.idTipoPreguntaNavigation.descripcion) {
      case "texto":
        respuestas.push({
          texto: element.toString(),
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          radicado: this.radicado,
        });
        break;
      case "archivo":
        respuestas.push({
          texto: element.toString().split("\\")[
            element.toString().split("\\").length - 1
          ],
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          archivo: this.fileId,
          radicado: this.radicado,
        });
        break;
      case "moneda":
        respuestas.push({
          moneda: element.toString(),
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          radicado: this.radicado,
        });
        break;
      case "fecha":
        respuestas.push({
          fecha: element.toString(),
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          radicado: this.radicado,
        });
        break;
      case "numero":
        respuestas.push({
          numero: parseInt(element),
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          radicado: this.radicado,
        });
        break;
      case "multiple":
        respuestas.push({
          idOpcionPregunta: parseInt(element),
          usuario: JSON.parse(sessionStorage.usuario).usuario1,
          fechaAud: new Date(),
          idPregunta: parseInt(key),
          municipio,
          radicado: this.radicado,
        });
        break;
      default:
        break;
    }
  }
}
