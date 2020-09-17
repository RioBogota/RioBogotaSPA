import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cargar-documento',
  templateUrl: './cargar-documento.component.html',
  styleUrls: ['./cargar-documento.component.css']
})
export class CargarDocumentoComponent extends Base implements OnInit {
  private usuario: any;
  public sitios = [];
  public documento: any = {};
  public sitio: any;
  public cargando: boolean;
  constructor(private securityService: TokenInterceptorService, private principalService: PrincipalService, private router: Router, private appService: AppService) {
    super();
  }

  ngOnInit() {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      this.usuario = JSON.parse(usuario);
    }
    this.unsubscribeOndestroy(this.securityService.getMicrositiosUsuario(this.usuario.idUsuario).subscribe(result => {
      this.sitios = result;
      this.sitio = this.sitios[0];
    }, () => {
      this.appService.error('Se produjo un error al obtener los sitios a los que tiene acceso el usuario.');
    }));
  }

  seleccionarArchivo(event) {
    this.cargando = true;
    const formData = new FormData();
    formData.append(this.documento.nombreDocumento, event.target.files[0], event.target.files[0].name);
    //TODO remove nested observables
    this.unsubscribeOndestroy(this.principalService.guardarDocumento(formData, this.documento.descripcionDocumento, this.sitio.idCarpeta).subscribe((result: any) => {
      this.documento.idDrive = result;
      this.documento.idUsuario = this.usuario.idUsuario;
      this.documento.fecha = new Date();
      this.documento.idEstado = 1;
      this.documento.idMicrositio = this.sitio.idMicrositio;
      this.unsubscribeOndestroy(this.securityService.guardarInformacionDocumento(this.documento).subscribe(() => {
        this.cargando = false;
        this.appService.success('Documento guardado exitosamente.');
        this.router.navigate(['/']);
      }, () => { this.cargando = false; this.appService.error('Se produjo un error al guardar la informacion del archivo.') }));
    },
      error => { this.cargando = false; console.error(error); this.appService.error('Se produjo un error al cargar el archivo.') }));
  }

}
