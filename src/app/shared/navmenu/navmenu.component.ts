import { Component } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { AppService } from 'src/app/services/app.service';
@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    public usuario: any;
    public opciones: any;
    constructor(private seguridadService: TokenInterceptorService, private appService: AppService) {
    }

    seleccionar = (opcion: string) => {
        this.appService.checkUserOptions.emit(opcion);
    }

    consultarOpciones = () => {
        const observable = this.seguridadService.getOpciones(this.usuario)
        if (!observable) {
            return;
        }
        observable.subscribe(result => {
            var opciones = result;
            this.opciones = opciones.filter(x => x.idOpcionPadre == null);
        }, error => console.error(error));
    }

    ngOnInit() {
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            this.usuario = JSON.parse(usuario);
            this.consultarOpciones();
        }
        this.appService.checkUserInfo
            .subscribe((user: any) => {
                this.usuario = user;
                this.consultarOpciones();
            });
    }
}
