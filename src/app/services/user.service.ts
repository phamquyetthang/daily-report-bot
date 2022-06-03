import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { IUser } from '../utils/types/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getAllUserService():Observer<IUser[]> {
    return this.apiService.get('/user/all') as Observer<IUser[]>
  }
}
