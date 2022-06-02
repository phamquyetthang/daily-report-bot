import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    AuthService,
    JwtService
  ],
  declarations: []
})
export class CoreModule { }
