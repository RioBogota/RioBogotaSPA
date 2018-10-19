import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    private usuario: any;
    constructor(private router: Router) {
    }

    ngOnInit() {
        var usuario = sessionStorage.getItem("usuario");
        if (usuario) {
            this.usuario = JSON.parse(usuario);
        }
    }

    cerrarSesion = () => { 
        sessionStorage.clear(); 
    }
}