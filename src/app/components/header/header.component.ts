import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.isAuth) {
      this.userService.getCurrentUser();
      this.userService.getAllUserService();
    }
  }

  openUserModal: boolean = false;

  get isAuth(): boolean {
    return !!this.jwtService.getToken();
  }

  get myInfo() {
    return this.userService.current;
  }

  onOpenUserModal() {
    this.openUserModal = !this.openUserModal;
  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigate(['/auth/login']);
  }
}
