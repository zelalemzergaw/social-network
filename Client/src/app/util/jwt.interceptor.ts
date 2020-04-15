import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.getCurrentUser();
        console.log("currentuser eko new",currentUser);
        if (currentUser && currentUser.access_token) {
            console.log(currentUser.access_token);
            request = request.clone({
                setHeaders: {
                    "access-token": currentUser.access_token
                }
            });
        }

        return next.handle(request);
    }
}
