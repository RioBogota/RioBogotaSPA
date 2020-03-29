import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/modelos/contacto';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent extends Base implements OnInit {
  public contacto: Contacto = new Contacto();
  public tiposContacto: any;
  constructor(private principalService: PrincipalService, private appService: AppService) {
    super();
    this.unsubscribeOndestroy(principalService.getTipoContacto().subscribe(result => {
      this.tiposContacto = result;
    }, error => {
      this.appService.error('No se puede procesar la solicitud en este momento, intente nuevamente mas tarde.')
    }));
  }

  ngOnInit() {
  }
  guardar = () => {
    this.contacto.fecha = new Date();
    this.unsubscribeOndestroy(this.principalService.guardarContacto(this.contacto).subscribe(result => {
      this.appService.success('Solicitud enviada exitosamente');
      this.contacto = new Contacto();
    }, error => {
      this.appService.error('Se produjo un error al enviar la solicitud. Intente nuevamente.');
    }));
  }
}
