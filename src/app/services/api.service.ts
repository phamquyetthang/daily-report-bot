import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private jwtService: JwtService) {
    this.headers.set('x-auth-token', this.jwtService.getToken());
  }

  private formatErrors(error: any) {
    console.log(
      '🚀 ~ file: api.service.ts ~ line 16 ~ ApiService ~ formatErrors ~ error',
      error
    );
    return throwError(error.error);
  }

  private headers = new HttpHeaders({
    Accept: 'application/json ',
    'Content-Type': 'application/json',

    'x-auth-token': '',
  });

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}${path}`, { headers: this.headers, params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${path}`,
        JSON.stringify(body),
        {
          headers: this.headers,
        }
      )
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}${path}`, { headers: this.headers })
      .pipe(catchError(this.formatErrors));
  }
}
