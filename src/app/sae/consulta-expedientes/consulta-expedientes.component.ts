import { Component, OnInit } from '@angular/core';
import { SAEService } from 'src/app/services/sae/sae.service';
import { Pagina } from 'src/app/modelos/pagina';

@Component({
  selector: 'app-consulta-expedientes',
  templateUrl: './consulta-expedientes.component.html',
  styleUrls: ['./consulta-expedientes.component.css']
})
export class ConsultaExpedientesComponent implements OnInit {
  public predios: any = [];
  public resoluciones: any = [];
  public tramites: any = [];
  public paginaPredios: Pagina;
  public pageSizeOptionsPredios: number[];
  public totalPredios: number;
  public pageSizePredios: number;

  public paginaResoluciones: Pagina;
  public pageSizeOptionsResoluciones: number[];
  public totalResoluciones: number;
  public pageSizeResoluciones: number;

  public paginaTramites: Pagina;
  public pageSizeOptionsTramites: number[];
  public totalTramites: number;
  public pageSizeTramites: number;
  constructor(private saeService: SAEService) { 
    this.paginaPredios = new Pagina();
    this.paginaPredios.numeroPagina = 0;
    this.paginaPredios.cantidadRegistros = 20;
    this.pageSizeOptionsPredios = [this.paginaPredios.cantidadRegistros];

    this.paginaResoluciones = new Pagina();
    this.paginaResoluciones.numeroPagina = 0;
    this.paginaResoluciones.cantidadRegistros = 20;
    this.pageSizeOptionsResoluciones = [this.paginaResoluciones.cantidadRegistros];

    this.paginaTramites = new Pagina();
    this.paginaTramites.numeroPagina = 0;
    this.paginaTramites.cantidadRegistros = 20;
    this.pageSizeOptionsTramites = [this.paginaTramites.cantidadRegistros];
    this.consultarPredios();
    this.consultarResoluciones();
    this.consultarTramites();
  }

  ngOnInit() {
    
  }
consultarPredios = () => {
  this.saeService.getPredios(this.paginaPredios).subscribe(result => {
    this.totalPredios = result.totalRegistros;
    this.pageSizePredios = result.totalRegistros / this.paginaPredios.cantidadRegistros;
    this.predios = result.resultados;
  }, error => { console.error(error) });
}
consultarResoluciones = () => {
  this.saeService.getResoluciones(this.paginaResoluciones).subscribe(result => {
    this.totalResoluciones = result.totalRegistros;
    this.pageSizeResoluciones = result.totalRegistros / this.paginaResoluciones.cantidadRegistros;
    this.resoluciones = result.resultados;
  }, error => { console.error(error) });
}
consultarTramites = () => {
  this.saeService.getTramites(this.paginaTramites).subscribe(result => {
    this.totalTramites = result.totalRegistros;
    this.pageSizeTramites = result.totalTramites / this.paginaTramites.cantidadRegistros;
    this.tramites = result.resultados;
  }, error => { console.error(error) });
}


  paginarPredios = (event) => {
    this.paginaPredios.numeroPagina = event.pageIndex;
    this.consultarPredios();
  }

  paginarResoluciones = (event) => {
    this.paginaResoluciones.numeroPagina = event.pageIndex;
    this.consultarResoluciones();
  }

  paginarTramites = (event) => {
    this.paginaTramites.numeroPagina = event.pageIndex;
    this.consultarTramites();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptionsPredios = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
