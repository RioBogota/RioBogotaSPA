import { Component, OnInit } from '@angular/core';
import { CechService } from 'src/app/services/CECH/cech.service';
import { Comite } from 'src/app/modelos/Comite';
import { Miembro } from 'src/app/modelos/Miembro';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.css']
})
export class InformacionGeneralComponent extends Base implements OnInit {
  public comite: Comite = { idComite: 0, descripcion: '', urlEstructuraOperativa: '', miembroComite: [] };
  public miembros: Miembro[];
  constructor(private cechService: CechService) {
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.cechService.consultarInformacionCECH().subscribe((result) => {
      this.comite = <Comite>result;
    }, error => { console.error(error); }));
    this.unsubscribeOndestroy(this.cechService.consultarMiembrosCECH().subscribe((result) => {
      this.miembros = <Miembro[]>result;
    }, error => {
      console.error(error);
    }));
  }

}
