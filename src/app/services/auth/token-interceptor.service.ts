import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDUsuarioNavigation, RolUsuario, Opcion } from 'src/app/modelos/Seguridad';
import { Soporte } from 'src/app/modelos/soporte';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  guardarInformacionInicio = (soporte: Soporte): Observable<any> => {
    return this.http.put(`${this.baseUrl}api/Principal/inicio/actualizar`, soporte);
  }

  obtenerInformacionInicio = (): Observable<any> => {
    return this.http.get(`${this.baseUrl}api/Principal/inicio`);
  }

  eliminarUsuarioEspecifico = (idUsuario: Number): Observable<any> => {
    return this.http.delete(`${this.baseUrl}api/Seguridad/usuario/${idUsuario}`);
  }

  actualizarUsuario = (usuario: any): Observable<any> => {
    return this.http.put(`${this.baseUrl}api/Seguridad/usuario/update`, usuario);
  }

  getUsuarioCorreo = (correo: String): Observable<any> => {
    return this.http.get(`${this.baseUrl}api/Seguridad/usuario/correo/${correo}`);
  }

  getModulos = (): Observable<any> => {
    return this.http.get(`${this.baseUrl}api/Seguridad/modulos`);
  }

  getModulo = (idModulo: number): Observable<any> => {
    return this.http.get(`${this.baseUrl}api/Seguridad/modulo/${idModulo}`);
  }

  updateModulo = (modulo: any): Observable<any> => {
    return this.http.put(`${this.baseUrl}api/Seguridad/modulo/actualizar`, modulo);
  }

  updateSitio = (sitio: any): Observable<any> => {
    return this.http.put(`${this.baseUrl}api/Seguridad/sitio/actualizar`, sitio);
  }

  getUsuarioEspecifico = (idUsuario: Number) => {
    return this.http.get(`${this.baseUrl}api/Seguridad/usuario/${idUsuario}`);
  }

  getLogin = (usuario, contrasena): Observable<any> => {
    let uri: String = 'api/Seguridad/usuario/' + usuario + '/' + contrasena;
    return this.http.get(this.baseUrl + uri);
  }

  getToken = (usuario, contrasena): Observable<any> => {
    let uri: String = 'api/Seguridad/token';
    const body = { 'usuario1': usuario, 'contrasena': contrasena };
    return this.http.post(this.baseUrl + uri, body);
  }

  getTodasOpciones = (): Observable<any> => {
    const uri: string = 'api/Seguridad/opciones';
    return this.http.get(this.baseUrl + uri);
  }

  saveRol =(rol): Observable<any> => {
    const uri: String = 'api/Seguridad/rol'
    return this.http.post(this.baseUrl + uri, rol)
  }

  getUsuarios = () => {
    return this.http.get(this.baseUrl + 'api/Seguridad/usuarios');
  }

  getOpciones = (usuario: any): Observable<any> | undefined => {
    if (!usuario) {
      usuario = { idUsuario: 0 };
    }
    if (!usuario.idUsuario) {
      usuario = { idUsuario: 0 };
    }
    const uri: String = 'api/Seguridad/opciones/' + usuario.idUsuario;
    return this.http.get(this.baseUrl + uri)
  }

  guardarUsuario = (usuario: IDUsuarioNavigation): Observable<any> => {
    return this.http.post(this.baseUrl + 'api/Seguridad/usuario/add', usuario);
  }

  guardarRolUsuario = (rolUsuario: RolUsuario) => {
    return this.http.post(this.baseUrl + 'api/Seguridad/usuario/rol/add', rolUsuario);
  }

  guardarOpcion = (opcion: Opcion) => {
    return this.http.post(this.baseUrl + 'api/Seguridad/opciones', opcion)
  }

  /**
   * @returns IDRolNavigation
   */
  getRoles = (): Observable<any> => {
    const uri = 'api/Seguridad/rol';
    return this.http.get(this.baseUrl + uri);
  }

  /**
 * @returns IDRolNavigation
 */
  getMicrositiosUsuario = (idUsuario: number): Observable<any> => {
    const uri = `api/Seguridad/micrositios/rol?idUsuario=${idUsuario}`;
    return this.http.get(this.baseUrl + uri);
  }

  guardarInformacionDocumento = (documento: any): Observable<any> => {
    const uri = 'api/Seguridad/documento/add';
    return this.http.post(this.baseUrl + uri, documento);
  }

  getEntities = (): Observable<any> => {
    const uri = 'api/Seguridad/entidades';
    return this.http.get(this.baseUrl + uri);
  }

  getEconomy = (idEntidad: number): Observable<any> =>{
    const uri = `api/Seguridad/indicador/economico/${idEntidad}`
    return this.http.get(this.baseUrl + uri)
  }  
}
