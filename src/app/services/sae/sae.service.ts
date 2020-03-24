import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagina } from 'src/app/modelos/pagina';

@Injectable({
  providedIn: 'root'
})
export class SAEService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getPredios = (pagina:Pagina): Observable<any> => {
    const uri = `api/SAE/predios?numeroPagina=${pagina.numeroPagina}&cantidadRegistros=${pagina.cantidadRegistros}`;
    return this.http.get(this.baseUrl + uri);
  }

  getResoluciones = (pagina:Pagina): Observable<any> => {
    const uri = `api/SAE/resoluciones?numeroPagina=${pagina.numeroPagina}&cantidadRegistros=${pagina.cantidadRegistros}`;
    return this.http.get(this.baseUrl + uri);
  }

  getTramites = (pagina:Pagina): Observable<any> => {
    const uri = `api/SAE/tramites?numeroPagina=${pagina.numeroPagina}&cantidadRegistros=${pagina.cantidadRegistros}`;
    return this.http.get(this.baseUrl + uri);
  }
}
