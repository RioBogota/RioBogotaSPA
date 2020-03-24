import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { IDUsuarioNavigation } from 'src/app/modelos/Seguridad';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  usuarios: any;
  copia: any;
  filtro: string
  constructor(private seguridadService: TokenInterceptorService) { }

  filtrar = () => {
    this.usuarios = this.copia.filter(x => x.usuario1.toUpperCase()
      .includes(this.filtro.toUpperCase()) || x.primerNombre.toUpperCase()
      .includes(this.filtro.toUpperCase()) || x.primerApellido.toUpperCase()
      .includes(this.filtro.toUpperCase()))
  }

  eliminar = (idUsuario: Number) => {
    this.seguridadService.eliminarUsuarioEspecifico(idUsuario).subscribe((result) => {
      this.usuarios.forEach((usuario, indice) => {
        if (usuario.idUsuario === idUsuario) {
          this.usuarios.splice(indice, 1);
          alert("Usuario eliminado correctamente");
        }
      });
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.seguridadService.getUsuarios().subscribe((result) => {
      this.usuarios = result;
      this.copia = this.usuarios.slice()
    }, (error) => {

    });
  }

}
