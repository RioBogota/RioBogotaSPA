import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent extends Base implements OnInit {

  usuarios: any;
  copia: any;
  filtro: string
  constructor(private seguridadService: TokenInterceptorService, private appService: AppService) {
    super();
  }

  filtrar = () => {
    this.usuarios = this.copia.filter(x => x.usuario1.toUpperCase()
      .includes(this.filtro.toUpperCase()) || x.primerNombre.toUpperCase()
        .includes(this.filtro.toUpperCase()) || x.primerApellido.toUpperCase()
          .includes(this.filtro.toUpperCase()))
  }

  eliminar = (idUsuario: Number) => {
    this.unsubscribeOndestroy(this.seguridadService.eliminarUsuarioEspecifico(idUsuario).subscribe((result) => {
      this.usuarios.forEach((usuario, indice) => {
        if (usuario.idUsuario === idUsuario) {
          this.usuarios.splice(indice, 1);
          this.appService.success("Usuario eliminado correctamente");
        }
      });
    }, (error) => {
      this.appService.error('Se produjo un error al eliminar el usuario, intente nuevamente mas tarde.');
      console.error(error);
    }));
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.seguridadService.getUsuarios().subscribe((result) => {
      this.usuarios = result;
      this.copia = this.usuarios.slice()
    }, (error) => {
      console.error(error);
    }));
  }
}
