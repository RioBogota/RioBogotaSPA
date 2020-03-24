import { Component, OnInit } from '@angular/core';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {

  public usuario: IDUsuarioNavigation;
  public editarUsuario: boolean;
  public confirmar: string;
  public hide: boolean = true;
  public hideConf: boolean = true;

  constructor(private seguridadService: TokenInterceptorService, private router: Router) {
    this.usuario = new IDUsuarioNavigation();
  }

  consultarUsuario = () => {
    if(this.confirmar !== this.usuario.contrasena) {
      alert('Las dos contraseñas deben ser iguales');
      return;
    }
    this.seguridadService.getUsuarioCorreo(this.usuario.correo).subscribe(result => {
      this.usuario = result;
      this.usuario.contrasena = '';
      this.editarUsuario = true;
    }, error => {
      alert(`No se puede obtener informacion del usuario. Intente con otro correo electronico.`);
      console.error(error);
      this.editarUsuario = false;
    })
  }

  guardar = () => {
    this.seguridadService.actualizarUsuario(this.usuario).subscribe(result => {
      alert(`Contraseña cambiada exitosamente.`);
      this.router.navigate(['login']);
    }, error => {
      alert(`Se produjo un error al actualizar el usuario ${this.usuario.usuario1}`);
      console.error(error);
    })
  }

  ngOnInit() {
  }

}
