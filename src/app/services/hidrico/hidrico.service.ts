import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HidricoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getDnpAll = (page): Observable<any> => {
  	const uri = `api/Seguridad/DNP/all/${page}`;
    return this.http.get(this.baseUrl + uri);
  } 

  getDnpVigentes = (page): Observable<any> => {
  	const uri = `api/Seguridad/DNP/vigente/${page}`;
    return this.http.get(this.baseUrl + uri);
  }

  getDnpHistorico = (page): Observable<any> => {
  	const uri = `api/Seguridad/DNP/historico/${page}`;
    return this.http.get(this.baseUrl + uri);
  }
}
