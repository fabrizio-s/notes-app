import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.authService.user.getValue()) {
            return next.handle(request);
        }
        const authorizedRequest = request.clone({
            headers: request.headers.append('Authorization', this.authService.user.getValue().token)
        });
        return next.handle(authorizedRequest);
    }

}
