import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './store/auth.actions';
import { AuthUserResponse, LoginCredentials, Token, SignUpUserResponse, SignUpCredentials } from './auth.model';
import { User } from '../shared/model/user.model';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

const handleAuthentication = (
    id: number,
    username: string,
    email: string,
    roles: string[],
    value: string,
    duration: number
): User => {
    const expires = new Date(Date.now() + duration);
    const token = new Token(value, expires);
    const user = new User(+id, username, email, roles, token);
    localStorage.setItem('userData', JSON.stringify(user));
    return user;
};

@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private store: Store,
                private router: Router) { }

    signup(credentials: SignUpCredentials) {
        this.http.post<SignUpUserResponse>('/api/register', {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        }).subscribe(console.log, console.error);
    }

    login(credentials: LoginCredentials): void {
        // tslint:disable-next-line: max-line-length
        this.http.get<AuthUserResponse>('/api/authenticate?username=' + credentials.username + '&password=' + credentials.password)
        .subscribe(
            response => {
                this.setLogoutTimer(response.token.duration);
                // tslint:disable-next-line: max-line-length
                const user = handleAuthentication(response.id, response.username, response.email, response.roles, response.token.value, response.token.duration);
                this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
            },
            error => {
                this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
                console.error(error);
            }
        );
    }

    redirect() {
        this.router.navigate(['home', 'welcome']);
    }

    logout() {
        this.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['auth', 'login']);
    }

    autologin() {
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
            return;
        }

        const token = new Token(userData._token.value, new Date(userData._token.expirationDate));

        const user = new User(
            userData.id,
            userData.username,
            userData.email,
            userData.roles,
            token
        );

        if (user.token) {
            this.setLogoutTimer(user.token.expirationDate.getTime() - Date.now());
            this.store.dispatch(new AuthActions.AuthenticateSuccess(user));
        }
    }

    setLogoutTimer(duration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, duration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

}
