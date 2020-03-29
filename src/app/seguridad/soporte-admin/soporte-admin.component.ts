import { Component, OnInit } from '@angular/core';
import { Soporte } from 'src/app/modelos/soporte';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-soporte-admin',
  templateUrl: './soporte-admin.component.html',
  styleUrls: ['./soporte-admin.component.css']
})
export class SoporteAdminComponent extends Base implements OnInit {
  public soporte: Soporte;
  public Editor = ClassicEditor;
  constructor(private soporteService: TokenInterceptorService, private appService: AppService) {
    super();
    this.soporte = new Soporte();
    this.unsubscribeOndestroy(this.soporteService.obtenerInformacionInicio().subscribe(result => {
      this.soporte = result;
    }, error => {
      console.error(error);
    }));
  }

  ngOnInit() {
  }

  guardar = () => {
    this.unsubscribeOndestroy(this.soporteService.guardarInformacionInicio(this.soporte).subscribe(respuesta => {
      this.appService.success('Informacion guardada exitosamente');
    }, error => {
      console.error(error);
      this.appService.error('no se puede guardar la informacion, intente nuevamente');
    }));
  }
}
