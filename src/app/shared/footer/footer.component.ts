import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/services/principal/principal.service';
@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public cantidadUsuarios : any;
    constructor(public router: Router, private principalService: PrincipalService) {

    }
    ngOnInit() {
        this.principalService.guardarContadorUsuarios().subscribe(resultado => {
            this.cantidadUsuarios = resultado;
        }, error => {
            console.error(error)
        })
    }
}
