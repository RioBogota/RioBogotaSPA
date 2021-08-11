import { SirhService } from "./../../services/sirh/sirh.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consulta",
  templateUrl: "./consulta.component.html",
  styleUrls: ["./consulta.component.css"],
})
export class ConsultaComponent implements OnInit {
  endpoints = [];
  result: any;
  cargando = false;
  constructor(private sirhService: SirhService) {}

  ngOnInit(): void {
    this.sirhService
      .getEndpoints()
      .subscribe((endpoints) => (this.endpoints = endpoints));
  }

  invocar(endpoint) {
    this.cargando = true;
    this.result = undefined;
    this.sirhService
      .getSpecificEndpoint(endpoint.identifier)
      .subscribe((datos) => {
        this.result = datos;
        this.cargando = false;
      });
  }
}
