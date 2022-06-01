import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  authType: 'login'|'signup' = 'login'
  ngOnInit(): void {
  }
  otherAuthLink = this.authType  === 'login' ? `?type=signup` : `?type=login`
  
}
