import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-editar-noticia',
  templateUrl: './editar-noticia.component.html',
  styleUrls: ['./editar-noticia.component.css']
})
export class EditarNoticiaComponent extends Base implements OnInit {
  public noticia: any;
  public tiposNoticias: any;
  public tiposMultimedias: any;
  public editar: Boolean;
  public Editor = ClassicEditor;
  public texto: any;
  constructor(private route: Router, private router: ActivatedRoute, private servicionoticias: PrincipalService, private sanitizer: DomSanitizer, private appService: AppService) {
    super();
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
    this.unsubscribeOndestroy(this.servicionoticias.getallTiposNoticias().subscribe(response => {
      this.tiposNoticias = response;
    }, error => { console.error(error); }));

    this.unsubscribeOndestroy(this.servicionoticias.getallTiposMultimedias().subscribe(response => {
      this.tiposMultimedias = response;
    }, error => {
      console.error(error);
    }));
    //TODO remove nested observables
    this.unsubscribeOndestroy(this.router.params.subscribe(result => {
      if (result.id) {
        this.editar = true;
        this.unsubscribeOndestroy(this.servicionoticias.getNoticiaEspecifica(result.id).subscribe(result => {
          this.noticia = result;
          this.noticia.fechaPublicacion = result.fechaPublicacion.split('T')[0];
        }, error => { console.error(error); this.appService.error('Se presento un error al consultar noticias'); }));
      }
    }, error => {
      console.error(error);
    }));
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
      this.unsubscribeOndestroy(this.servicionoticias.editarNoticia(this.noticia).subscribe(response => {
        this.appService.success('Noticia guardada correctamente');
        this.route.navigate(['/noticias/consulta']);
      }, error => {
        this.appService.error('Se produjo un error al guardar la noticia');
        console.error(error);
      }));
      return;
    }
    this.unsubscribeOndestroy(this.servicionoticias.guardarNoticia(this.noticia).subscribe(response => {
      this.appService.success('Noticia guardada correctamente');
      this.route.navigate(['/noticias/consulta']);
    }, error => {
      this.appService.error('Se produjo un error al guardar la noticia');
      console.error(error);
    }));
  }

  agregarMultimedia = () => {
    this.noticia.multimediaNoticia.push({ idTipoMultimedia: 1 })
  }

  ngOnInit() {
  }

}
