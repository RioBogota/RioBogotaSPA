import { Component, OnInit } from '@angular/core';
import { Contacto } from 'src/app/modelos/contacto';
import { PrincipalService } from 'src/app/services/principal/principal.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public contacto: Contacto = new Contacto();
  public tiposContacto: any;
  constructor(private principalService: PrincipalService) {
    principalService.getTipoContacto().subscribe(result => {
      this.tiposContacto = result;
    }, error => {
      alert('No se puede procesar la solicitud en este momento, intente nuevamente mas tarde.')
    })
   }

  ngOnInit() {
  }
  guardar = () => {
    this.contacto.fecha = new Date();
    this.principalService.guardarContacto(this.contacto).subscribe(result => {
      alert('Solicitud enviada exitosamente');
      this.contacto = new Contacto();
    }, error => {
      alert('Se produjo un error al enviar la solicitud. Intente nuevamente.')
    })
  }
}
