import { Component } from '@angular/core';
import { JwtService } from './services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daily-report-bot';
  constructor(private jwtService: JwtService){

  }
  get jwtToken(){
    return this.jwtService.getToken()
  }
}
