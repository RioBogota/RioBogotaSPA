import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/auth/token-interceptor.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  public opciones: Array<any>;
  constructor(private seguridadService: TokenInterceptorService) {
    this.opciones = [];
  }

  ngOnInit() {
    this.seguridadService.getTodasOpciones().subscribe((result) => {
      this.opciones = result;
    }, (error) => {
      console.error("Error");
    })
  }

}
