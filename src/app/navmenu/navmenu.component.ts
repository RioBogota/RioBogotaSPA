import { Component, OnInit, Input, Inject } from '@angular/core';
import { Http } from '@angular/http';
@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    private usuario: any;
    private opciones: any;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    consultarOpciones = () => {
        let uri: String = 'api/Seguridad/opciones/' + this.usuario.idUsuario;
        this.http.get(this.baseUrl + uri).subscribe(result => {
            this.opciones = result.json();
            console.log(this.opciones);
        }, error => console.error(error));
    }

    ngOnInit() {
        var usuario = sessionStorage.getItem("usuario");
        if (usuario) {
            this.usuario = JSON.parse(usuario);
        }
        this.consultarOpciones();
    }
}
