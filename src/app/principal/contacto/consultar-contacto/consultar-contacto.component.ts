import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-consultar-contacto',
  templateUrl: './consultar-contacto.component.html',
  styleUrls: ['./consultar-contacto.component.css']
})
export class ConsultarContactoComponent extends Base implements OnInit {

  public contactos: any;
  constructor(private principalService: PrincipalService, private appService: AppService) { 
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(
      this.principalService.getContacto().subscribe(
        result => this.contactos = result, 
        error => this.appService.error('Se produjo un error al consultar la información, intente nuevamente mas tarde.'))
    );
  }

}
