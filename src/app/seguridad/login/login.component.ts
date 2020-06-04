import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { AppService } from 'src/app/services/app.service';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { Base } from 'src/app/shared/base';
import { md5 } from 'src/app/shared/md5';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends Base {
    hide = true;
    public usuario: IDUsuarioNavigation;
    public error: Boolean = false;
    public mensajeError: string | null = null;
    constructor(private router: Router, private loginService: TokenInterceptorService, private appService: AppService) {
        super();
    }

    ingresar = (data: any) => {
        this.mensajeError = '';
        this.error = false;
        // TODO remove nested observables
        this.unsubscribeOndestroy(this.loginService.getLogin(data.usuario.toUpperCase(), md5(data.contrasena)).subscribe(result => {
            this.usuario = result;
            sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
            this.appService.checkUserInfo.emit(this.usuario);
            this.obtenerToken(data);
        }, error => {
            console.error(error);
            if (error && error.status === 404) {
                this.mensajeError = 'No se encontro el usuario o la contraseña, cambie los parametros de ingreso e intente nuevamente.';
                return;
            }
            if (error && error.message) {
                this.mensajeError = error.message;
                return;
            }
            this.mensajeError = error;
            this.error = true;
        }));
    }

    cerrarSesion = () => {
        sessionStorage.clear();
        this.appService.checkUserOptions.emit([]);
        this.appService.checkUserInfo.emit(undefined);
    }

    obtenerToken = (data: any) => {
        this.unsubscribeOndestroy(this.loginService.getToken(data.usuario, md5(data.contrasena)).subscribe(res => {
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['/home']);
        }, error => {
            console.error(error);
        }));

    }

    ngOnInit() {
        this.cerrarSesion()
    }
}
