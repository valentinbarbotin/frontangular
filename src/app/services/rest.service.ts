import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RESTService {

  isAuth = false;
  token = "";

  getHeaders() {
    var headers:any = {
      'Content-Type': 'application/json'
    };

    if (this.token != "") {
      console.log("ajout token header")
      headers['Authorization'] = `Bearer ${this.token}`;
    } else {
      console.log("pas de token")
    }

    return headers
  };
  
  GET(endpoint: string) {
    return this.http.get<any[]>(
      environment.api+endpoint,
      {headers: new HttpHeaders(this.getHeaders())}
      );
  }

  POST(endpoint: string, data: Object) {
    return this.http.post<any[]>(
      environment.api+endpoint,
      data,
      {headers: new HttpHeaders(this.getHeaders())}
      );
  }

  DELETE(endpoint: string) {
    return this.http.delete<any[]>(
      environment.api+endpoint,
      {headers: new HttpHeaders(this.getHeaders())}
      );
  }
  
  constructor(
    private http: HttpClient
  ) { }
}
