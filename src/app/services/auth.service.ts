import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}
  loginService(email: string, password: string):Observable<{token: string}> {
    return this.apiService
      .post('/auth/login', { email, password }) as Observable<{token: string}>;
  }

  signupService(email: string, password: string):Observable<{token: string}> {
    return this.apiService
      .post('/auth/register', { email, password }) as Observable<{token: string}>;
  }
}
