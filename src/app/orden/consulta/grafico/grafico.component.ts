import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { OrdenService } from "src/app/services/orden/orden.service";
import { Base } from "src/app/shared/base";

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.component.html",
  styleUrls: ["./grafico.component.css"],
})
export class GraficoComponent extends Base implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = "Country";
  showYAxisLabel = false;
  yAxisLabel = "Population";

  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  acceso: boolean;
  ordenes = [];
  preguntas: [];
  usuario: any;
  selectedOrden: number;
  selectedPregunta: number;
  selectedGrafica: number;
  cargando = false;
  showGrafica = false;
  datos: any;
  constructor(
    private appService: AppService,
    private ordenService: OrdenService
  ) {
    super();
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.usuario
      ? JSON.parse(sessionStorage.usuario)
      : undefined;
    if (!this.usuario) {
      this.appService.error(
        "No tiene permisos para ingresar a la pagina. Consulte al administrador."
      );
      this.acceso = false;
      return;
    }
    this.selectedGrafica = 1;
    this.unsubscribeOndestroy(
      this.ordenService.isValidUser(this.usuario.usuario1).subscribe(
        (data) => {
          this.acceso = data > 0;
          if (!this.acceso) {
            this.appService.error(
              "No tiene permisos para ingresar a la pantalla, consulte al adminstrador"
            );
          }
        },
        (err) => {
          this.acceso = false;
          this.appService.error(
            "Se produjo un error al cargar la pagina intente nuevamente"
          );
        }
      )
    );

    this.unsubscribeOndestroy(
      this.ordenService.getOrdenes().subscribe(
        (res) => (this.ordenes = res),
        (err) =>
          this.appService.error(
            "No se pueden obtener las ordenes, intente nuevamente mas tarde"
          )
      )
    );
  }

  onSelect(event) {
    console.log(event);
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  consultar() {
    this.showGrafica = false;
    this.cargando = true;
    this.unsubscribeOndestroy(
      this.ordenService
        .getRespuestasGrafica(this.selectedPregunta)
        .subscribe((data) => {
          this.cargando = false;
          this.datos = data;
          this.showGrafica = true;
        })
    );
  }

  consultarPreguntas() {
    this.cargando = true;
    this.preguntas = [];
    this.showGrafica = false;
    this.unsubscribeOndestroy(
      this.ordenService.getPreguntasMultiples(this.selectedOrden).subscribe(
        (res: []) => {
          this.preguntas = res;
          this.cargando = false;
        },
        (err) => {
          this.appService.error(
            "Se produjo un error consultando las preguntas"
          );
        }
      )
    );
  }
}
