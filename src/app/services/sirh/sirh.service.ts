import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SirhService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEndpoints(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/SIRH/endpoints`)
  }

  getSpecificEndpoint(identifier) {
    return this.http.get(`${this.baseUrl}api/SIRH/endpoint/PROD/${identifier}`);
  }
}
