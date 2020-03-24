import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'rol',
    templateUrl: './rol.component.html',
    styleUrls: []
})
export class RolComponent {
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        //this.usuario = new Usuario();
    }
}