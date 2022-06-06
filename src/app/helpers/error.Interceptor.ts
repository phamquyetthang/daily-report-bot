import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.code === 'UN_LOGIN') {
          // auto logout if 401 response returned from api
          this.jwtService.destroyToken();
        }
        let errorMessage = 'Unknown error!';
        if (err.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${err.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
