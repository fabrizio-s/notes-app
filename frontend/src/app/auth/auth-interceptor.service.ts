import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from './store/auth.state';
import { User } from '../shared/model/user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    @Select(AuthState.user) private user$: Observable<User>;

    constructor(private store: Store) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.user$.pipe(
            take(1),
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
