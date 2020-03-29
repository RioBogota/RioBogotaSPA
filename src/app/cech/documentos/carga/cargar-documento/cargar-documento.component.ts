import { Component, OnInit } from '@angular/core';
import { CechService } from 'src/app/services/CECH/cech.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-cargar-documento',
  templateUrl: './cargar-documento.component.html',
  styleUrls: ['./cargar-documento.component.css']
})
export class CargarDocumentoComponent extends Base implements OnInit {

  public nombreArchivo: string;
  public descripcionArchivo: string;
  constructor(private cechService: CechService) {
    super();
  }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    const formData = new FormData();
    formData.append(this.nombreArchivo, event.target.files[0], event.target.files[0].name);
    this.unsubscribeOndestroy(this.cechService.guardarDocumento(formData, this.descripcionArchivo).subscribe(result => { alert('Archivo subido exitosamente.') },
      error => { console.error(error); alert('Se produjo un error al cargar el archivo.') }));
  }

}
