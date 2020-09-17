import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoNoticia } from 'src/app/enums/tipoNoticia';
import { Contacto } from 'src/app/modelos/contacto';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getSiteMap = (): Observable<any> => {
    const uri = `api/Seguridad/componentes`;
    return this.http.get(this.baseUrl + uri);
  }

  getContacto(): Observable<any> {
    const uri = `api/Principal/contacto/get`;
    return this.http.get(this.baseUrl + uri);
  }

  getChild = (idHijo:number): Observable<any> => {
    const uri = `api/Seguridad/micrositio/${idHijo}`;
    return this.http.get(this.baseUrl + uri);
  }

  guardarContadorUsuarios = () => {
    const uri = `api/Principal/inicio/actualizar`;
    return this.http.post(this.baseUrl + uri, {});
  }

  getTipoContacto = (): Observable<any> => {
    const uri = `api/Principal/contacto/tipos`;
    return this.http.get(this.baseUrl + uri);
  }

  getNoticias = (tipoNoticia: TipoNoticia): Observable<any> => {
    const uri = `api/Principal/noticias/${tipoNoticia}`;
    return this.http.get(this.baseUrl + uri);
  }

  getAllnoticias = (): Observable<any> => {
    const uri = `api/Principal/noticias`;
    return this.http.get(this.baseUrl + uri);
  }

  getNoticiaEspecifica = (idNoticia): Observable<any> => {
    const uri = `api/Principal/noticia/detalle/${idNoticia}`;
    return this.http.get(this.baseUrl + uri);
  }

  getallTiposNoticias = (): Observable<any> => {
    const uri = `api/Principal/tipos/noticias`;
    return this.http.get(this.baseUrl + uri);
  }

  getallTiposMultimedias = (): Observable<any> => {
    const uri = `api/Principal/tipos/multimedias`;
    return this.http.get(this.baseUrl + uri);
  }

  guardarNoticia = (noticia: any): Observable<any> => {
    const uri = `api/Principal/noticias/add`;
    return this.http.post(this.baseUrl + uri, noticia);
  }

  guardarContacto = (contacto: Contacto): Observable<any> => {
    const uri = `api/Principal/contacto/add`;
    return this.http.post(this.baseUrl + uri, contacto);
  }

  editarNoticia = (noticia: any): Observable<any> => {
    const uri = `api/Principal/noticias/edit`;
    return this.http.put(this.baseUrl + uri, noticia);
  }

  consultarDocumentos = (idCarpeta: string) => {
    const uri = `api/Principal/documentos/1000/${idCarpeta}`;
    return this.http.get(this.baseUrl + uri);
  }

  editarFacebookVideo = (facebookVideo: any): Observable<any> => {
    const uri = `api/Principal/facebook`;
    return this.http.put(this.baseUrl + uri, facebookVideo);
  }

  consultarFacebookVideo = (): Observable<any> => {
    const uri = `api/Principal/facebook`;
    return this.http.get(this.baseUrl + uri);
  }

  guardarDocumento = (data: FormData, descripcion: string, idCarpeta: string) => {
    const uri = `api/Principal/documentos/${idCarpeta}?descripcion=${descripcion}`;
    return this.http.post(this.baseUrl+ uri, data);
  }

  refrescarToken = (token: string) => {
    const uri = `api/Principal/documentos/token?token=${token}`;
    return this.http.post(this.baseUrl+ uri, {});
  }

  verDocumentos = (): Observable<any> => {
    const uri = `api/Seguridad/documentos/all`;
    return this.http.get(this.baseUrl + uri);
  }

  actualizarEstadoDoc = (data): Observable<any> => {
    const uri = `api/Seguridad/documento/update`;
    return this.http.put(this.baseUrl + uri, data);
  }
}
