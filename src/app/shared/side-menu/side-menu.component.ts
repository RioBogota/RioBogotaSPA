import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { TipoOpcion } from 'src/app/enums/tipoOpcion';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { IDUsuarioNavigation, Opcion } from 'src/app/modelos/Seguridad';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public seleccion: string;
  public opciones: Opcion;
  public usuario: IDUsuarioNavigation;
  public abrir: Boolean;
  constructor(private seguridadService: TokenInterceptorService, private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.consultarOpciones(TipoOpcion.DEFECTO);
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      this.usuario = JSON.parse(usuario);
    }
    this.appService.checkUserInfo
      .subscribe((user: IDUsuarioNavigation) => {
        this.usuario = user;
        if (!this.usuario) {
          this.consultarOpciones(TipoOpcion.DEFECTO);
        }
      });
    this.appService.open.subscribe((open: Boolean) => {
      this.abrir = open;
    })
    this.consultarOpcionSeleccionada();
  }

  consultarOpcionSeleccionada = () => {
    this.appService.checkUserOptions
      .subscribe((opcion: string) => {
        if (opcion) {
          this.consultarOpciones(parseInt(opcion))
          return;
        }
      });
  }

  consultarOpciones = (opcionSeleccionada: any) => {
    this.seguridadService.getOpciones(this.usuario).subscribe(result => {
      var opciones = result;
      this.opciones = opciones.filter(x => x.idOpcionPadre == opcionSeleccionada);
    }, error => console.error(error));
  }

  seleccionarOpcion = (opcion: string) => {
    this.seleccion = opcion;
  }
}
