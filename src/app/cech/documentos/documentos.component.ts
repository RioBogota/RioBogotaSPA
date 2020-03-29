import { Component, OnInit } from '@angular/core';
import { CechService } from 'src/app/services/CECH/cech.service';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent extends Base implements OnInit {

  public documentos: any;
  public modulo: any = {};
  constructor(private principalService: PrincipalService) {
    super();
  }

  ngOnInit() {
    //TODO Remove nested observables
    this.unsubscribeOndestroy(this.principalService.getChild(94).subscribe(modulo => {
      this.modulo = modulo;
      if (modulo.idCarpeta) {
        this.unsubscribeOndestroy(this.principalService.consultarDocumentos(this.modulo.idCarpeta).subscribe(documentos => {
          this.documentos = documentos;
        }, error => {
          console.error(error);
          if (error.status !== 404)
            alert('Se produjo un error al consultar los documentos');
        }));
      }
    }));
  }

}
