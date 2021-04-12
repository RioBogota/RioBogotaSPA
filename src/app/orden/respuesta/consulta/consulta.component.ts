import { PrincipalService } from './../../../services/principal/principal.service';
import { AppService } from "./../../../services/app.service";
import { OrdenService } from "src/app/services/orden/orden.service";
import { Component, OnInit } from "@angular/core";
import { Base } from "src/app/shared/base";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent extends Base implements OnInit {
  municipios = [];
  selectedMunicipio: number;
  selectedOrden: number;
  respuestas = [];
  ordenes = [];
  cargando = false;
  p: number = 1;
  constructor(
    private ordenService: OrdenService,
    private appService: AppService,
    private principalService: PrincipalService
  ) {
    super();
  }

  ngOnInit() {
    this.selectedMunicipio = -1;
    this.selectedOrden = -1;
    this.unsubscribeOndestroy(
      this.ordenService.getMunicipios().subscribe(
        (data) => (this.municipios = data),
        (err) =>
          this.appService.error(
            "Se produjo un error al obtener los municipios, intente nuevamente mas tarde."
          )
      )
    );
    this.ordenService.getOrdenes().subscribe(
      (res) => (this.ordenes = res),
      (err) =>
        this.appService.error(
          "No se pueden obtener las ordenes, intente nuevamente mas tarde"
        )
    );
  }

  consultar() {
    this.cargando = true;
    this.unsubscribeOndestroy(
      this.ordenService
        .getRespuestas(this.selectedMunicipio, this.selectedOrden)
        .subscribe((data) => {
          this.cargando = false;
          this.respuestas = data.map(respuesta => {
          respuesta.orden = this.ordenes.find(orden => orden.idOrden === respuesta.idPreguntaNavigation.idOrden)
          return respuesta;
        })})
    );
  }

  seleccionarArchivo(event, respuesta) {
    const formData = new FormData();
    formData.append(event.target.files[0].name, event.target.files[0], event.target.files[0].name);
    let orden = this.ordenes.find(orden => orden.idOrden === this.selectedOrden);
    this.unsubscribeOndestroy(
      this.principalService
        .guardarDocumento(
          formData,
          event.target.files[0].name,
          orden.idCarpetaDrive
        )
        .subscribe(
          (result: any) => {
            this.ordenService.putArchivo( event.target.files[0].name, result, respuesta.idRespuesta)
            .subscribe(res => {
              respuesta.texto = event.target.files[0].name;
              respuesta.archivo = result;
              this.appService.success('Se cargo el archivo exitosamente.');
            }, err => {
              this.appService.error('Se produjo un arror al cargar el archivo');
            });
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
