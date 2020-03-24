import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent implements OnInit {
  public noticia: any;
  public tiposNoticias: any;
  public tiposMultimedias: any;
  public editar: Boolean;
  public Editor = ClassicEditor;
  public texto: any;
  constructor(private router: ActivatedRoute, private servicionoticias: PrincipalService, private sanitizer: DomSanitizer) {
    this.noticia = {
      "titulo": null,
      "descripcion": null,
      "idTipoNoticia": 1,
      "referencias": null,
      "activa": true,
      "multimediaNoticia": [
        {
          "idMultimediaNoticia": 0,
          "url": null,
          "idTipoMultimedia": 1,
          "activa": true
        }
      ],
      idUsuario: 0,
      fechaPublicacion: null
    };
    this.tiposNoticias = [];
    this.tiposMultimedias = [];
    this.servicionoticias.getallTiposNoticias().subscribe(response => {
      this.tiposNoticias = response;
    }, error => { console.error(error); });

    this.servicionoticias.getallTiposMultimedias().subscribe(response => {
      this.tiposMultimedias = response;
    }, error => {
      console.error(error);
    });
    this.router.params.subscribe(result => {
      if (result.id) {
        this.editar = true;
        this.servicionoticias.getNoticiaEspecifica(result.id).subscribe(result => {
          this.noticia = result;
          this.noticia.fechaPublicacion = result.fechaPublicacion.split('T')[0];
        }, error => { console.error(error); alert('Se presento un error al consultar noticias'); });
      }
    }, error => {
      console.error(error);
    })
  }

  cambiarValorMultimedia = ($event, multimedia) => {
    multimedia.activa = $event;
  }

  cambiarValorNoticia = (evento: any) => {
    this.noticia.activa = evento;
  }

  guardar = () => {
    const usuario: any = sessionStorage.usuario ? JSON.parse(sessionStorage.usuario) : undefined;
    this.noticia.idUsuario = usuario.idUsuario;
    if (this.editar) {
      this.servicionoticias.editarNoticia(this.noticia).subscribe(response => {
        console.log(response);
        alert('Noticia guardada correctamente');
      }, error => {
        alert('Se produjo un error al guardar la noticia');
        console.error(error);
      });
      return;
    }
    this.servicionoticias.guardarNoticia(this.noticia).subscribe(response => {
      console.log(response);
      alert('Noticia guardada correctamente');
    }, error => {
      alert('Se produjo un error al guardar la noticia');
      console.error(error);
    });
  }

  agregarMultimedia = () => {
    this.noticia.multimediaNoticia.push({ idTipoMultimedia: 1 })
  }

  ngOnInit() {
  }

}
