import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { IDRolNavigation, Opcion, OpcionRol } from 'src/app/modelos/Seguridad';
import { ActivatedRoute } from '@angular/router';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
    selector: 'opcion',
    templateUrl: './opcion.component.html',
    styleUrls: ['./opcion.component.css']
})
export class OpcionComponent extends Base {
    public roles: IDRolNavigation;
    public opcion: Opcion;
    private todasOpciones: Array<Opcion>;
    public opciones: Array<Opcion>;
    public esSubopcion: Boolean;
    constructor(private seguridadService: TokenInterceptorService, private router: ActivatedRoute, private appService: AppService) {
        super();
        this.opcion = new Opcion();
        this.opcion.opcionRol = new Array<OpcionRol>();
        this.opcion.opcionRol[0] = new OpcionRol();
        this.opciones = new Array<Opcion>();
        this.todasOpciones = new Array<Opcion>();
    }

    ngOnInit() {
        this.unsubscribeOndestroy(this.seguridadService.getRoles().subscribe((result) => {
            this.roles = result;
            this.opcion.opcionRol[0].idRol = this.roles[0].idRol;
        }, (error) => {
            console.error(error);
        }));
        
        // TODO remove nested observables
        this.unsubscribeOndestroy(this.seguridadService.getTodasOpciones().subscribe((result) => {
            this.opciones = result.filter(x => x.idOpcionPadre === null);
            this.todasOpciones = result;
            this.unsubscribeOndestroy(this.router.params.subscribe(response => {
                if(response.id) {
                    const seleccionada = this.todasOpciones.filter(x => x.idOpcion == response.id)[0];
                    this.opcion = seleccionada;
                    if(this.opcion.idOpcionPadre) {
                        this.esSubopcion = true;
                    }
                }
            }, error => {console.error(error)}))
        }, (error) => {
            console.error("Error");
        }));
    }

    guardar = () => {
        this.unsubscribeOndestroy(this.seguridadService.guardarOpcion(this.opcion).subscribe((result) => {
            this.appService.success('Opción guardada exitosamente');
        }, (error) => {
            this.appService.error('Se produjo un error al guardar la opcion');
            console.error(error);
        }));
    }
}
