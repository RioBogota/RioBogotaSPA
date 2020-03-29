import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { ActivatedRoute } from '@angular/router';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-unica',
  templateUrl: './unica.component.html',
  styleUrls: ['./unica.component.css']
})
export class UnicaComponent extends Base implements OnInit {

  public componente: any;
  public urlMapa: SafeScript;
  public documentos: any = [];
  public seleccionado = 0;
  public idMicrositio: number = -1;
  public componenteTitulo: any;

  public imgModulo: Array<string> = [
    '../../assets/PNG/r-aire.png',
    '../../assets/PNG/r-hidrico.png',
    '../../assets/PNG/r-suelo.png',
    '../../assets/PNG/r-ordenamiento.png',
    '../../assets/PNG/r-riesgo.png',
    '../../assets/PNG/r-climatico.png'
  ]

  constructor(
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private principalService: PrincipalService) {
    super();
    //TODO remove nested observables
    this.unsubscribeOndestroy(this.router.params.subscribe(ruta => {
      this.unsubscribeOndestroy(this.principalService.getSiteMap().subscribe(result => {
        let tempComponente = result.filter((componente => componente.idComponente === parseInt(ruta.id)));
        tempComponente[0].modulo.forEach(mod => {
          this.mostrarMapa(mod.mapaMicrositio);
          this.mostrarVideos(mod.video);
        });

        this.componente = tempComponente;
        this.componenteTitulo = this.componente[0].descripcion.split(" ", 4)
        console.log(this.componenteTitulo)
      }));
    }));
  }

  mostrarSitios(modulo) {
    modulo.mostrar = !modulo.mostrar;
  }

  seleccionarModulo(indice, modulo) {
    this.seleccionado = indice;
    this.idMicrositio = -1;
    modulo.mostrar = false;
  }

  mostrarMapa = (mapas) => {
    if (mapas && mapas.length) {
      mapas.forEach(mapa => {
        mapa.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(mapa.urlMapa);
      });
    }
  }

  mostrarVideos = (videos) => {
    videos.forEach(video => {
      video.url = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });

  }

  mostrarMicrositio = (id: number) => {
    this.idMicrositio = id;
  }

  ngOnInit() {
  }

}
