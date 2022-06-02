import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate() {
    if (this.jwtService.getToken()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
