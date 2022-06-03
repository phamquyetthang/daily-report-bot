import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private jwtService: JwtService) {}

  ngOnInit(): void {}
  
  openUserModal: boolean = false;

  get isAuth(): boolean {
    return !!this.jwtService.getToken();
  }

  onOpenUserModal() {
    this.openUserModal = !this.openUserModal;
  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/auth/login']);
  }
}
