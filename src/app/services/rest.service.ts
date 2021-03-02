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

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  GET(endpoint: string) {
    return this.http.get<any[]>(
      environment.api+endpoint,
      this.httpHeader
      );
  }

  POST(endpoint: string, data: Object) {
    return this.http.post<any[]>(
      environment.api+endpoint,
      data,
      this.httpHeader
      );
  }

  DELETE(endpoint: string) {
    return this.http.delete<any[]>(
      environment.api+endpoint,
      this.httpHeader
      );
  }
  
  constructor(
    private http: HttpClient
  ) { }
}
