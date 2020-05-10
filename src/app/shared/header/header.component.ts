import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Soporte } from 'src/app/modelos/soporte';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from '../base';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent extends Base {
    public usuario: IDUsuarioNavigation;
    public abrir: Boolean;
    public urlImagen: SafeScript;
    public soporte: Soporte;
    public facebook: any = {};
    constructor(private appService: AppService, public router: Router, private sanitizer: DomSanitizer, private soporteService: TokenInterceptorService, private principalService: PrincipalService) {
        super();
        this.unsubscribeOndestroy(this.principalService.consultarFacebookVideo().subscribe(result => {
            result.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(result.urlVideo)
            this.facebook = result;
        }, error => console.error(error)));

        this.unsubscribeOndestroy(this.soporteService.obtenerInformacionInicio().subscribe(result => {
            this.soporte = result;
            if (this.soporte.imagenInicio.trim().length > 0)
                this.urlImagen = this.sanitizer.bypassSecurityTrustResourceUrl(this.soporte.imagenInicio);
        }, error => {
            this.soporte = new Soporte();
            console.error(error);
        }));
    }

    ngOnInit() {
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            this.usuario = JSON.parse(usuario);
        }
        this.appService.checkUserInfo
            .subscribe((user: IDUsuarioNavigation) => {
                this.usuario = user;
            });
        this.appService.open.emit(this.abrir);
    }
    abrirMenu = () => {
        this.abrir = !this.abrir;
        this.appService.open.emit(this.abrir);
    }

}
