import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent extends Base implements OnInit {
  public modulos: any[];
  public sitios = [];
  public modulo: any = {};
  public sitio: any = {};
  public hijos: boolean;
  public adminSitio: boolean;
  constructor(private seguridadService: TokenInterceptorService, private principalService: PrincipalService) {
    super();
   }

  ngOnInit() {
    this.unsubscribeOndestroy(this.seguridadService.getModulos().subscribe((result) => {
      this.modulos = result.filter((data) => {
        return data.idMicrositio !== 23;
      });
      this.modulo = this.modulos[0];
      this.precargarSeleccionados();
    }));
    this.unsubscribeOndestroy(this.principalService.getSiteMap().subscribe(result => {
      result.forEach(componente => {
        componente.modulo.forEach(modulo => {
          this.sitios.push(modulo);
        });
      });
    }));
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
  
  guardarSitio() {
    this.unsubscribeOndestroy(this.seguridadService.updateSitio(this.sitio).subscribe(() => {
      alert('Informacion guardada exitosamente');
    }, (error)  => {
      alert('Se produjo un error al guardar el registro, intente nuevamente');
    }));
  }

  guardar() {
    this.modulo.subsitioIdHijoNavigation = [];
    this.modulos.forEach(micrositio => {
      if (micrositio.seleccionado && !this.modulo.subsitioIdHijoNavigation.some(x => x.idHijo === micrositio.idMicrositio)) {
        this.modulo.subsitioIdHijoNavigation.push({ idHijo: micrositio.idMicrositio, idPadre: this.modulo.idMicrositio })
      }
    })
    this.unsubscribeOndestroy(this.seguridadService.updateModulo(this.modulo).subscribe(() => {
      alert('Modulo actualizado correctamente');
    }, () => {
      alert('Se produjo un error al actualizar el modulo.');
    }));
  }

  seleccionarValores(event, propiedad) {
    propiedad.seleccionado = event;
  }

  seleccionarHijos(event) {
    this.hijos = event;
  }

  agregarMapa() {
    if (!this.modulo.mapaMicrositio) {
      this.modulo.mapaMicrositio = [];
    }
    this.modulo.mapaMicrositio.push({ imagenMiniaturaUrl: '../../assets/PNG/cuenca_media_boton.png', idMicrositio: this.modulo.idModulo });
  }

  agregarVideo() {
    if (!this.modulo.video) {
      this.modulo.video = [];
    }
    this.modulo.video.push({ url: '', idUsuario: JSON.parse(sessionStorage.usuario).idUsuario, fecha: new Date(), titulo: '', descripcion: '', idMicrositio: this.modulo.idModulo });
  }

  eliminarMapa(index) {
    this.modulo.mapaMicrositio.splice(index, 1);
  }
  eliminarVideo(index) {
    this.modulo.video.splice(index, 1);
  }
}
