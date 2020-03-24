import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { IDRolNavigation, Opcion, OpcionRol } from 'src/app/modelos/Seguridad';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'opcion',
    templateUrl: './opcion.component.html',
    styleUrls: ['./opcion.component.css']
})
export class OpcionComponent {
    public roles: IDRolNavigation;
    public opcion: Opcion;
    private todasOpciones: Array<Opcion>;
    public opciones: Array<Opcion>;
    public esSubopcion: Boolean;
    constructor(private seguridadService: TokenInterceptorService, private router: ActivatedRoute) {
        this.opcion = new Opcion();
        this.opcion.opcionRol = new Array<OpcionRol>();
        this.opcion.opcionRol[0] = new OpcionRol();
        this.opciones = new Array<Opcion>();
        this.todasOpciones = new Array<Opcion>();
    }

    ngOnInit() {
        this.seguridadService.getRoles().subscribe((result) => {

            this.roles = result;
            this.opcion.opcionRol[0].idRol = this.roles[0].idRol;
        }, (error) => {
            console.error(error);
        });

        this.seguridadService.getTodasOpciones().subscribe((result) => {
            this.opciones = result.filter(x => x.idOpcionPadre === null);
            this.todasOpciones = result;
            this.router.params.subscribe(response => {
                if(response.id) {
                    const seleccionada = this.todasOpciones.filter(x => x.idOpcion == response.id)[0];
                    this.opcion = seleccionada;
                    if(this.opcion.idOpcionPadre) {
                        this.esSubopcion = true;
                    }
                }
            }, error => {console.error(error)})
        }, (error) => {
            console.error("Error");
        });
    }

    guardar = () => {
        this.seguridadService.guardarOpcion(this.opcion).subscribe((result) => {
            alert("Opcion Guardada Exitosamente");
        }, (error) => {
            console.error(error);
        })
    }
}
