import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  public modulos: any[];
  public modulo: any = {};
  public idUsuario: number;
  public esAdmin: any;
  public searchNombre: string;
  public searchText: string;
  public rol: {
    idRol?: number,
    nombre: string,
    apruebaDocumentos: boolean,
    opcionRol?: any[],
    rolMicrositio: any[],
    rolUsuario?: any[]
  }
  public opciones: any;

  constructor(private seguridadService: TokenInterceptorService, private appService: AppService) {
    this.rol = {
      nombre: '',
      apruebaDocumentos: false,
      rolMicrositio: []
    }
  }

  ngOnInit() {
    this.seguridadService.getModulos().subscribe((result) => {
      this.modulos = result.filter((data) => {
        return data.idMicrositio !== 23;
      }).sort((a, b) => {
        if (a.descripcion > b.descripcion) {
          return 1;
        }
        if (a.descripcion < b.descripcion) {
          return -1;
        }
        return 0;
      });
      this.modulo = this.modulos[0];
      this.precargarSeleccionados();
    });

    this.seguridadService.getTodasOpciones().subscribe(result => {
      this.opciones = result.filter(x => x.idOpcionPadre != null).sort((a, b) => {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    })
  }

  precargarSeleccionados() {
    let activos = this.modulos.filter(modulo => {
      return modulo.seleccionado === true;
    });
    activos.forEach(act => {
      act.seleccionado = false;
    });
    this.modulo.subsitioIdHijoNavigation.forEach(subsitio => {
      this.modulos.forEach(mod => {
        if (mod.idMicrositio === subsitio.idHijo) {
          mod.seleccionado = true;
          return;
        }
      });
    });
  }

  guardar() {
    this.modulos.forEach(micrositio => {
      if (micrositio.seleccionado) {
        this.rol.rolMicrositio.push({ idMicrositio: micrositio.idMicrositio })
      }
    })

    this.rol.opcionRol = this.opciones.filter(x => x.seleccionado === true).map(opcion => {
      return { idOpcion: opcion.idOpcion }
    })
    console.log(this.rol.opcionRol)
    this.seguridadService.saveRol(this.rol).subscribe(result => {
      this.appService.success('Rol guardado exitosamente')
    },
      error => {
        this.appService.error('Se produjo un error al guardar el rol');
        console.error(error)
      })
  }

  seleccionarValores(event, propiedad) {
    propiedad.seleccionado = event;
  }
}

