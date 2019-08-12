import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthUserResponse, SignUpUserResponse } from '../auth.model';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { Token } from 'src/app/user/token.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

const handleAuthentication = (
    id: number,
    username: string,
    email: string,
    roles: string[],
    value: string,
    duration: number
): AuthActions.AnyAction => {
    const expires = new Date(Date.now() + duration);
    const token = new Token(value, expires);
    const user = new User(+id, username, email, roles, token);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(user);
};

const handleError = (error: any): Observable<AuthActions.AnyAction> => {
    console.error(error);
    return of(new AuthActions.AuthenticateFail(error.message));
};

@Injectable()
export class AuthEffect {

    @Effect()
    login = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        switchMap((action: AuthActions.Login) => {
            // tslint:disable-next-line: max-line-length
            return this.http.get<AuthUserResponse>('/api/authenticate?username=' + action.payload.username + '&password=' + action.payload.password)
            .pipe(
                tap(response => this.authService.setLogoutTimer(response.token.duration)),
                // tslint:disable-next-line: max-line-length
                map(response => handleAuthentication(response.id, response.username, response.email, response.roles, response.token.value, response.token.duration)),
                catchError(error => handleError(error))
            );
        })
    );

    @Effect({ dispatch: false })
    redirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => this.router.navigate(['/welcome']))
    );

    @Effect({ dispatch: false })
    logout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/login']);
        })
    );

    @Effect()
    autologin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                id: number,
                username: string,
                email: string,
                roles: string[],
                _token: {
                    value: string,
                    expirationDate: string
                }
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return { type: 'DUMMY' };
            }

            const token = new Token(userData._token.value, new Date(userData._token.expirationDate));

            const user = new User(userData.id,
                userData.username,
                userData.email,
                userData.roles,
                token);

            if (user.token) {
                this.authService.setLogoutTimer(user.token.expirationDate.getTime() - Date.now());
                return new AuthActions.AuthenticateSuccess(user);
            }
            return { type: 'DUMMY' };
        })
    );

    @Effect({ dispatch: false })
    signup = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP),
        tap(
            (action: AuthActions.SignUp) => {
                this.http.post<SignUpUserResponse>('/api/register', {
                    username: action.payload.username,
                    email: action.payload.email,
                    password: action.payload.password
                }).subscribe(console.log, console.error);
            }
        )
    );

    constructor(private actions$: Actions,
                private http: HttpClient,
                private authService: AuthService,
                private router: Router) { }

}
