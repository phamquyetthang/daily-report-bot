import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import { IAuthType } from 'src/app/utils/types/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) {
  }

  get authType(): IAuthType {
    let type: IAuthType = 'login';
    this.route.params.subscribe((params) => {
      type = params['type'] as IAuthType;
    });
    return type;
  }

  ngOnInit(): void {
    if(this.jwtService.getToken()){
      this.router.navigate(['']);
    }
  }
  email: string = '';
  password: string = '';

  setAuthInfo(token: string): void {
    this.jwtService.saveToken(token);
    this.router.navigate(['']);
  }

  onSubmitAuth() {
    switch (this.authType) {
      case 'login':
        this.authService
          .loginService(this.email, this.password)
          .subscribe((data) => {
            this.setAuthInfo(data.token);
          });
        break;
      case 'signup':
        this.authService
          .signupService(this.email, this.password)
          .subscribe((data) => {
            this.setAuthInfo(data.token);
          });
        break;
      default:
        break;
    }
  }
}
