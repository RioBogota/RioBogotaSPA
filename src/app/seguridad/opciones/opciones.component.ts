import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';
import { Base } from 'src/app/shared/base';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent extends Base implements OnInit {
  public opciones: Array<any>;
  constructor(private seguridadService: TokenInterceptorService) {
    super();
    this.opciones = [];
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.seguridadService.getTodasOpciones().subscribe((result) => {
      this.opciones = result;
    }, (error) => {
      console.error("Error");
    }));
  }

}
