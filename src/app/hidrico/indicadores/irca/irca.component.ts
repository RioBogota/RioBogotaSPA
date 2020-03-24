import { Component, OnInit, Pipe } from '@angular/core';
import { HidricoService } from 'src/app/services/hidrico/hidrico.service'

@Component({
  selector: 'app-irca',
  templateUrl: './irca.component.html',
  styleUrls: ['./irca.component.css']
})

export class IrcaComponent implements OnInit {

  public indicadores: any;
  public pagina: number = 1;
  public opciones = [];
  selectedValue;

  constructor(private hidricoService: HidricoService) {
    this.opciones = ['Vigentes', 'Históricos', 'Todos']
  }


  ngOnInit() {
    this.selectedValue = 'Todos';
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
        const value = indicador[llave].nombre

        if (!arreglo.some(valor => valor.llave == value)) {
          arreglo.push({ llave: value, valores: [{ valor: objectsByKeyValue.valor }] })
        }
        else {
          arreglo[arreglo.length - 1].valores.push({ valor: objectsByKeyValue.valor })
        }
        //objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(indicador.valor)
        return indicador
      }
    )
    return arreglo
  }

  consultarIndicador() {
    if (this.selectedValue === 'Vigentes') {
      this.hidricoService.getDnpVigentes(this.pagina).subscribe(
        result => {
          this.indicadores = result;
          //this.indicadores = this.transformarIndicador(result)
          console.log(result)
        }, error => {
          console.error(error);
        }
      );
      return;
    }

    if (this.selectedValue === 'Históricos') {
      this.hidricoService.getDnpHistorico(this.pagina).subscribe(
        result => {
          this.indicadores = result;
          console.log(this.indicadores)
        }, error => {
          console.error(error);
        }
      );
      return;
    }

    if (this.selectedValue === 'Todos') {
      this.hidricoService.getDnpAll(this.pagina).subscribe(
        result => {
          this.indicadores = [];
          this.indicadores = this.groupBy(result, 'idMunicipioNavigation')
          console.log(this.indicadores);
        }, error => {
          console.error(error);
        }
      );
      return;
    }

  }
}
