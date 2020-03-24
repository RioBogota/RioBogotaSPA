import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta.noticias',
  templateUrl: './consulta-noticias.component.html',
  styleUrls: ['./consulta-noticias.component.css']
})
export class ConsultaNoticiasComponent implements OnInit {
  public noticias: any = [];
  constructor(private servicioPrincipal: PrincipalService, private router: Router) {
   }

  ngOnInit() {
    this.servicioPrincipal.getAllnoticias().subscribe(result => {
      this.noticias = result;
    }, error => { console.error(error); alert('Se presento un error al consultar noticias'); });
  }
  agregarNuevo = () => {
    this.router.navigate(['noticias/add'])
  }
}
