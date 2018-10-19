import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private noticias: any;
    private usuario: any;
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    ngOnInit() {        this.obtenerNoticias();        var usuario = sessionStorage.getItem("usuario");        if (usuario) {          this.usuario = JSON.parse(usuario);        }    }



    obtenerNoticias = () => {
        let uri: string = '/api/Principal/noticias'
        this.noticias = [];
        this.http.get(this.baseUrl + uri)          .subscribe((result) => {              if (result.json())
              {
                  this.noticias = result.json();
              }
          },          (err) => {              console.error(err);          });
    } 

}



  
