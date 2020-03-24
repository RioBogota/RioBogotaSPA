import { Component, OnInit } from '@angular/core';
import { CechService } from 'src/app/services/CECH/cech.service';

@Component({
  selector: 'app-cargar-documento',
  templateUrl: './cargar-documento.component.html',
  styleUrls: ['./cargar-documento.component.css']
})
export class CargarDocumentoComponent implements OnInit {

  public nombreArchivo: string;
  public descripcionArchivo: string;
  constructor(private cechService: CechService) { }

  ngOnInit() {
  }

  seleccionarArchivo(event) {
    console.log(event.target.files);
    const formData = new FormData();
    formData.append(this.nombreArchivo, event.target.files[0], event.target.files[0].name);
    this.cechService.guardarDocumento(formData, this.descripcionArchivo).subscribe(result => { console.log(result); alert('Archivo subido exitosamente.') },
      error => { console.error(error); alert('Se produjo un error al cargar el archivo.') });
  }

}
