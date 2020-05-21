import { Component, OnInit, Pipe, OnDestroy } from '@angular/core';
import { HidricoService } from 'src/app/services/hidrico/hidrico.service'
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-irca',
  templateUrl: './irca.component.html',
  styleUrls: ['./irca.component.css']
})

export class IrcaComponent extends Base implements OnInit {

  public indicadores: any;
  public pagina: number = 1;
  public opciones = [];
  selectedValue;

  constructor(private hidricoService: HidricoService) {
    super();
    this.opciones = ['Vigentes', 'Históricos', 'Todos']
  }


  ngOnInit() {
    this.selectedValue = 'Vigentes';
    this.consultarIndicador();
  }

  transformarIndicador(indicadores) {
    let retorno = [];
    let indice = 0
    for (let j = 0; j < indicadores.length / 14; j++) {
      let objeto = [];
      if (j !== 0) {
        indice = j + 14
      }
      for (let i = indice; i < indice + 14; i++) {
        let element = indicadores[i];
        objeto.push(JSON.parse(JSON.stringify(element)));
      }
      retorno.push(objeto)
    }
    return retorno
  }

  groupBy(indicadores, llave) {
    let arreglo = [];
    let objeto = indicadores.reduce(
      (objectsByKeyValue, indicador) => {
        const value = objectsByKeyValue[llave].nombre
        if (!arreglo.some(valor => valor.llave == value)) {
          arreglo.push({ llave: value, valores: [{ valor: objectsByKeyValue.valor }] })
        }
        else {
          arreglo[arreglo.length - 1].valores.push({ valor: objectsByKeyValue.valor })
        }
        return indicador
      }
    )
    return arreglo
  }

  consultarIndicador() {
    if (this.selectedValue === 'Vigentes') {
      this.unsubscribeOndestroy(this.hidricoService.getDnpVigentes(this.pagina).subscribe(
        result => {
          this.indicadores = [];
          this.indicadores = this.groupBy(result, 'idMunicipioNavigation')
        }, error => {
          console.error(error);
        }
      ));
      return;
    }

    if (this.selectedValue === 'Históricos') {
      this.unsubscribeOndestroy(this.hidricoService.getDnpHistorico(this.pagina).subscribe(
        result => {
          this.indicadores = [];
          this.indicadores = this.groupBy(result, 'idMunicipioNavigation')
        }, error => {
          console.error(error);
        }
      ));
      return;
    }

    if (this.selectedValue === 'Todos') {
      this.unsubscribeOndestroy(this.hidricoService.getDnpAll(this.pagina).subscribe(
        result => {
          this.indicadores = [];
          this.indicadores = this.groupBy(result, 'idMunicipioNavigation')
        }, error => {
          console.error(error);
        }
      ));
      return;
    }

  }
}
