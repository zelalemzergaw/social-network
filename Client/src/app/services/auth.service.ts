import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../util';

import { environment } from '../../environments/environment';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUser: User;

    constructor(private http: HttpClient) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser) {
            
        }
    }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    isUserAuthenticated() {
      return this.currentUser != null;
    }

    login(username: string, password: string) {
      console.log(username, password);
        return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/login", {username, password })
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                if (response && response.result.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response.result));
                    this.currentUser = response.result;
                }

                return response.result;
            }));
    }

    forgotPassword(email) {
           return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/forgot-password", {email: email});
    }

    newPassword(data) {
        console.log("okay")
        return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/reset-password", data);
 }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}
