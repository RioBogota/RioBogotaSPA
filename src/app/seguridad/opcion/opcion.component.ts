import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
    selector: 'opcion',
    templateUrl: './opcion.component.html',
    styleUrls: []
})
export class OpcionComponent {
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        //this.usuario = new Usuario();
    }
}