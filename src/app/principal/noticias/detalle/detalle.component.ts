import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal/principal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
public noticia: any;
  constructor(private router: ActivatedRoute,private noticiasService: PrincipalService) { }

  ngOnInit() {
    this.router.params.subscribe(result => {
      if(result.id){
        this.noticiasService.getNoticiaEspecifica(result.id).subscribe(noticia => {
          this.noticia = noticia
        }, error => {
          console.error(error); alert('Se produjo un error al consultar la noticia');
        })
      }
    }, error => {console.error(error); alert('Se produjo un error al consultar la noticia');})
  }

}
