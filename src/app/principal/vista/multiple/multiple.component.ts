import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleComponent extends Base implements OnInit {
  public modulo: any = {};
  public urlMapa2: SafeScript;
  public documentos: any = [];
  public padres: any;
  public hijos: any;
  public idUrl: number;

  _idMicrositio: number;
  get idMicrositio(): number {
    return this._idMicrositio;
  }

  @Input('idMicrositio')
  set idMicrositio(value: number) {
    this._idMicrositio = value;
    this.cargarDatos(this._idMicrositio);
  }

  constructor(private router: ActivatedRoute, private seguridadService: TokenInterceptorService,
    private sanitizer: DomSanitizer, private principalService: PrincipalService, private appService: AppService) {
    super();
    this.init();
  }

  init() {
    //TODO remove ensted observables
    this.unsubscribeOndestroy(this.router.url.subscribe(urlResult => {
      if (urlResult[0].path !== 'multiple')
        return;

      this.unsubscribeOndestroy(this.router.params.subscribe(result => {
        this.idUrl = result.id;
        this.cargarDatos(result.id);
      }));
    }));
  }

  cargarDatos = (id: number) => {
    this.unsubscribeOndestroy(this.principalService.getChild(id).subscribe(modulo => {
      this.mostrarUrl(modulo.video);
      this.modulo = modulo;
      if (modulo.subsitioIdPadreNavigation)
        this.padres = modulo.subsitioIdPadreNavigation.filter(padre => padre)
      if (modulo.subsitioIdHijoNavigation)
        this.hijos = modulo.subsitioIdHijoNavigation.filter(hijo => hijo)
      if (modulo.idCarpeta) {
        this.unsubscribeOndestroy(this.principalService.consultarDocumentos(this.modulo.idCarpeta).subscribe(documentos => {
          this.documentos = documentos;
        }, error => {
          console.error(error);
          if (error.status !== 404) {
            this.appService.error('Se produjo un error al consultar los documentos del modulo');
          }
        }));
      }
      this.urlMapa2 = undefined;
      if (this.modulo && this.modulo.mapaMicrositio && this.modulo.mapaMicrositio.length) {
        this.mostrarMapa(this.modulo.mapaMicrositio[0].urlMapa);
      }
    }));
  }

  mostrarMapa = (url: string) => {
    if (!url) {
      this.urlMapa2 = undefined;
      return;
    }
    this.urlMapa2 = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  mostrarUrl = (videos) => {
    videos.forEach(video => {
      video.url = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
    });

  }

  ngOnInit() { }
}