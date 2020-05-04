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
  roles: any;
  entidades: any;
  filtro: string;
  private _selectedFilterRol: string[];
  get selectedFilterRol(): string[] {
    return this._selectedFilterRol;
  }
  set selectedFilterRol(value: string[]) {
    this._selectedFilterRol = value;
    this.filtrarRol(value);
  }

  private _selectedFilterEntidad: string[];
  get selectedFilterEntidad(): string[] {
    return this._selectedFilterEntidad;
  }
  set selectedFilterEntidad(value: string[]) {
    this._selectedFilterEntidad = value;
    this.filtrarEntidad(value);
  }

  constructor(private seguridadService: TokenInterceptorService, private appService: AppService) {
    super();
  }

  filtrar = () => {
    if (!this.filtro) {
      this.filtrarRol(this._selectedFilterRol);
      return;
    }
    this.usuarios = this.copia.filter(x => x.usuario1.toUpperCase()
      .includes(this.filtro.toUpperCase()) || x.primerNombre.toUpperCase()
        .includes(this.filtro.toUpperCase()) || x.primerApellido.toUpperCase()
          .includes(this.filtro.toUpperCase()))
  }

  filtrarEntidad(value) {
    if (this._selectedFilterRol && this._selectedFilterRol.length) {
      this.usuarios = this.copia.filter(x => this._selectedFilterRol.includes(x.rolUsuario[0].idRolNavigation.nombre))
    } else {
      this.usuarios = this.copia;
    }
    if (value && value.length) {
      this.usuarios = this.usuarios
        .filter(x => value.includes(x.idEntidadNavigation.descripcion));
    }
  }

  filtrarRol(value) {
    if (this._selectedFilterEntidad && this._selectedFilterEntidad.length) {
      this.usuarios = this.copia
        .filter(x => this._selectedFilterEntidad.includes(x.idEntidadNavigation.descripcion));

    } else {
      this.usuarios = this.copia;
    }
    if (value && value.length) {
      this.usuarios = this.usuarios
        .filter(x => value.includes(x.rolUsuario[0].idRolNavigation.nombre))
    }
  }

  consultarRoles() {
    this.unsubscribeOndestroy(this.seguridadService.getRoles().subscribe(
      result => { this.roles = result; },
      error => {
        console.error(error);
        this.appService.error('Se produjo un error al consultar el filtro de roles.')
      }))
  }

  consultarEntidades() {
    this.unsubscribeOndestroy(this.seguridadService.getEntities().subscribe(
      result => this.entidades = result,
      error => {
        console.error(error);
        this.appService.error('Se produjo un error al consultar el filtro de entidades.')
      }))
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
    this.consultarEntidades();
    this.consultarRoles();
    this.unsubscribeOndestroy(this.seguridadService.getUsuarios().subscribe((result) => {
      this.usuarios = result;
      this.copia = this.usuarios.slice()
    }, (error) => {
      console.error(error);
    }));
  }
}
