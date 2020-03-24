import { Component, OnInit } from '@angular/core';
import { CechService } from 'src/app/services/CECH/cech.service';
import { Comite } from 'src/app/modelos/Comite';
import { Miembro } from 'src/app/modelos/Miembro';

@Component({
  selector: 'app-informacion-general',
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.css']
})
export class InformacionGeneralComponent implements OnInit {
  public comite: Comite = { idComite: 0, descripcion: '', urlEstructuraOperativa: '', miembroComite: [] };
  public miembros: Miembro[];
  constructor(private cechService: CechService) { }

  ngOnInit() {
    this.cechService.consultarInformacionCECH().subscribe((result) => {
      this.comite = <Comite>result;
    }, error => { console.error(error); });
    this.cechService.consultarMiembrosCECH().subscribe((result) => {
      this.miembros = <Miembro[]>result;
    }, error => {
      console.error(error);
    });
  }

}
