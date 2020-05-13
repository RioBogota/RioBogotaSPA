import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { AppService } from 'src/app/services/app.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent extends Base implements OnInit {
  facebook: any = {};
  constructor(private principalService: PrincipalService, private appService: AppService) { super(); }

  ngOnInit() {
    this.consultarTransmisionActual();
  }

  cambiarValorTransmision = (evento: any) => {
    this.facebook.transmitiendo = evento;
  }

  castTag(url: string): string {
    if(!url) {
      this.appService.error('No es una etiqueta de video valida, ingrese a facebook -> videos en vivo -> compartir -> insertar');
      return null;
    }
    if(url.indexOf('<iframe') === -1 && url.indexOf('src="') === -1) {
      this.appService.error('No es una etiqueta de video valida, ingrese a facebook -> videos en vivo -> compartir -> insertar');
      return null;
    }
    return url.split('src="')[1].split('"')[0];
  }

  consultarTransmisionActual() {
    this.unsubscribeOndestroy(this.principalService.consultarFacebookVideo().subscribe(
      facebookVideo => this.facebook = facebookVideo, error => {
        console.error(error);
        this.appService.error('Se produjo un error al consultar la información del video.');
      }
    ));
  }

  actualizarTransmision() {
    const url = this.castTag(this.facebook.urlVideo);
    if(!url) {
      return;
    }
    this.facebook.urlVideo = url;
    this.unsubscribeOndestroy(this.principalService.editarFacebookVideo(this.facebook).subscribe(result => this.appService.success('Informacion actualizada exitosamente')
      , error => {
        this.appService.error('Se produjo un error al actualizar la informacion del video.');
        console.error(error);
      }));
  }

}
