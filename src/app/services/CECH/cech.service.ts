import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CechService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  consultarInformacionCECH = () => {
    const uri = `api/CECH/comite`;
    return this.http.get(this.baseUrl + uri);
  }

  consultarMiembrosCECH = () => {
    const uri = `api/CECH/comite/miembros`;
    return this.http.get(this.baseUrl + uri);
  }

  consultarDocumentosCECH = () => {
    const uri = `api/CECH/documentos/12`;
    return this.http.get(this.baseUrl + uri);
  }

  guardarDocumento = (data: FormData, descripcion: string) => {
    const uri = `api/CECH/documentos?descripcion=${descripcion}`;
    return this.http.post(this.baseUrl+ uri, data);
  }
}
