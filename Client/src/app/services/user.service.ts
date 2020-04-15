import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:any;

  constructor(private http: HttpClient) { 

  }

  getUserById(id) {
    return this.http.get<ApiResponse>(environment.API_URL + "/api/users/" + id);
  }

  signup(user: User){
     return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/signup", user);
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
  getCurrrentUser() {
    return this.currentUser;
  }
}

