import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/user.model';
import { Note } from '../note/note.model';
import { Router } from '@angular/router';
import { AuthUserResponse } from './auth-user-response.model';
import { Token } from '../user/token.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: {username: string, password: string}) {
        this.http.get<AuthUserResponse>('/api/authenticate?username=' + credentials.username + '&password=' + credentials.password)
        .subscribe(response => {
            if (response && response.token) {
                const user = new User(response.id,
                                response.username,
                                response.email,
                                response.roles,
                                new Token(response.token.value, new Date(Date.now() + response.token.duration)));
                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
                this.autologout(response.token.duration);
                this.router.navigate(['read']);
            }
        },
        error => {
            console.error(error);
        });
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
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

        const user = new User(userData.id,
                                userData.username,
                                userData.email,
                                userData.roles,
                                new Token(userData._token.value, new Date(userData._token.expirationDate)));

        if (user.token) {
            this.user.next(user);
            this.autologout(user.token.expirationDate.getTime() - Date.now());
        }
    }

    autologout(duration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }

    isAdmin(): boolean {
        return this.user.getValue() && this.user.getValue().roles.includes('ROLE_ADMIN');
    }

    isNoteOwner(note: Note): boolean {
        return this.user.getValue() && this.user.getValue().id === note.user.id;
    }

}
