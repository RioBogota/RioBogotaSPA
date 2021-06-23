import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styleUrls: ['./financiero.component.css']
})
export class FinancieroComponent extends Base implements OnInit {
  public entidades = []
  public datos: any;
  public cabeceras: any;
  public ordenes = [];
  public tarjetas = [];
  constructor(private securityService: TokenInterceptorService) {
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.securityService.getEntities().subscribe(result => {
      this.entidades = result;
    },
      error => {
        console.error(error)
      }));
    this.cambioDatos(1)
  }

  cambioDatos(idEntidad) {
    let objeto = new Set();
    let newGroup = [];
    this.ordenes = [];
    this.unsubscribeOndestroy(this.securityService.getEconomy(idEntidad).subscribe(result => {
      result.map(datos => {
        if (datos.idDetalleIndicadorNavigation.idDetalleIndicador === 15) {
          newGroup = [];
        }
        if (datos.idDetalleIndicadorNavigation.idDetalleIndicador <= 46) {
          newGroup.push(datos);
        }
        if (datos.idDetalleIndicadorNavigation.idDetalleIndicador === 46) {
          this.ordenes.push(newGroup);
        }
      });
      this.tarjetas = Array(result.length / 32).fill(0);
    }));
  }

  convertirMatriz(datos) {
    let columnas = 32;
    let retorno = [];
    let filas = datos.length / columnas;
    for (let index = 0; index < filas; index++) {
      let arregloInterno = datos.slice(index * columnas, (index * columnas) + columnas);
      retorno.push(arregloInterno);
    }
    return retorno;
  }
}
