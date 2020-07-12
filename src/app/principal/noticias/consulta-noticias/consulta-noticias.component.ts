import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { Router } from '@angular/router';
import { Base } from 'src/app/shared/base';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-consulta.noticias',
  templateUrl: './consulta-noticias.component.html',
  styleUrls: ['./consulta-noticias.component.css']
})
export class ConsultaNoticiasComponent extends Base implements OnInit {
  public noticias: any = [];
  p: number = 1;
  constructor(private servicioPrincipal: PrincipalService, private router: Router, private appService: AppService) {
    super();
  }

  ngOnInit() {
    this.unsubscribeOndestroy(this.servicioPrincipal.getAllnoticias().subscribe(result => {
      this.noticias = result;
    }, error => { console.error(error); this.appService.error('Se presento un error al consultar noticias'); }));
  }
  agregarNuevo = () => {
    this.router.navigate(['noticias/add'])
  }
}
