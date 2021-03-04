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
    private appService: AppService
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
}
