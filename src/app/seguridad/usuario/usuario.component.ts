import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    selector: 'usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
    private usuario: any;
    private error: boolean = false;
    private mensajeError: string | null = null;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        //this.usuario = new Usuario();
    }
}