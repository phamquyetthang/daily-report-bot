import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { IUser } from '../utils/types/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  users: IUser[] = [];
  private isLoginIdObject = new ReplaySubject<string>(1);
  public isLoginId = this.isLoginIdObject.asObservable();

  current: IUser = {
    _id: '',
    avt: '',
    email: '',
    name: '',
    slack_id: '',
  };

  getAllUserService(): void {
    this.apiService.get('/user/all').subscribe((res) => {
      this.users = res;
    });
  }

  getCurrentUser(): void {
    this.apiService.get('/user/info').subscribe((res) => {
      this.current = res;
      this.isLoginIdObject.next(res._id)
    });
  }
}
