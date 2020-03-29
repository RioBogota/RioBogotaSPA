import { Component, OnInit } from '@angular/core';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent extends Base implements OnInit {

  public usuario: IDUsuarioNavigation;
  public editarUsuario: boolean;
  public confirmar: string;
  public hide: boolean = true;
  public hideConf: boolean = true;

  constructor(private seguridadService: TokenInterceptorService, private router: Router, private appService: AppService) {
    super();
    this.usuario = new IDUsuarioNavigation();
  }

  consultarUsuario = () => {
    if (this.confirmar !== this.usuario.contrasena) {
      this.appService.error('Las dos contraseñas deben ser iguales');
      return;
    }
    this.unsubscribeOndestroy(this.seguridadService.getUsuarioCorreo(this.usuario.correo).subscribe(result => {
      this.usuario = result;
      this.usuario.contrasena = '';
      this.editarUsuario = true;
    }, error => {
      this.appService.error(`No se puede obtener informacion del usuario. Intente con otro correo electronico.`);
      console.error(error);
      this.editarUsuario = false;
    }));
  }

  guardar = () => {
    this.unsubscribeOndestroy(this.seguridadService.actualizarUsuario(this.usuario).subscribe(result => {
      this.appService.success(`Contraseña cambiada exitosamente.`);
      this.router.navigate(['login']);
    }, error => {
      this.appService.error(`Se produjo un error al actualizar el usuario ${this.usuario.usuario1}`);
      console.error(error);
    }));
  }

  ngOnInit() {
  }

}
