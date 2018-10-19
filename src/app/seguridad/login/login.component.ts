import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private usuario: any;
    private error: boolean = false;
    private mensajeError: string | null = null;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        //this.usuario = new Usuario();
    }
    ingresar = (data: any) => {
        this.error = false;
        let uri: String = 'api/Seguridad/usuario/' + data.usuario + '/' + data.contrasena;
        this.http.get(this.baseUrl + uri).subscribe(result => {
            this.usuario = result.json();
            //this.router.navigate(["/app", this.usuario.idUsuario]);
            sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
            this.router.navigate(["/home"]);
        }, error => {
            this.mensajeError = JSON.parse(error._body).mensaje;
            this.error = true;
        });
    }
}