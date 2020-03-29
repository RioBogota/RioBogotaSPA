import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Soporte } from 'src/app/modelos/soporte';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent extends Base implements OnInit {
  public soporte: Soporte;
  constructor(private soporteService: TokenInterceptorService) {
    super();
    this.unsubscribeOndestroy(this.soporteService.obtenerInformacionInicio().subscribe(result => {
      this.soporte = result;
    }, error => {
      this.soporte = new Soporte();
      console.error(error);
    }));
  }

  ngOnInit() {
  }

}
