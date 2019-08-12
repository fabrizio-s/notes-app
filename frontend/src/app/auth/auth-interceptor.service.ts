import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { take, map, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
            take(1),
            map(state => state.user),
            exhaustMap(
                user => {
                    if (!user) {
                        return next.handle(request);
                    }
                    const authorizedRequest = request.clone({
                        headers: request.headers.append('Authorization', user.token.value)
                    });
                    return next.handle(authorizedRequest);
                }
            )
        );
    }

}
