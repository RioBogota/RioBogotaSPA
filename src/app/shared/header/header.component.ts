import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Soporte } from 'src/app/modelos/soporte';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public usuario: IDUsuarioNavigation;
    public abrir: Boolean;
    public urlImagen: SafeScript;
    public soporte: Soporte;
    constructor(private appService: AppService, public router: Router, private sanitizer: DomSanitizer, private soporteService: TokenInterceptorService) {
        this.soporteService.obtenerInformacionInicio().subscribe(result => {
            this.soporte = result;
            this.urlImagen = this.sanitizer.bypassSecurityTrustResourceUrl(this.soporte.imagenInicio);
        }, error => {
            this.soporte = new Soporte();
            console.error(error);
        });
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
