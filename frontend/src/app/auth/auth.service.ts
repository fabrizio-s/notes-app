import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/user.model';
import { Note } from '../note/note.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: {username: string, password: string}) {
        this.http.get<User>('/api/authenticate?username=' + credentials.username + '&password=' + credentials.password)
        .subscribe(user => {
            if (user) {
                this.user.next(user);
                this.router.navigate(['read']);
                localStorage.setItem('userData', JSON.stringify(user));
            }
        },
        error => {
            console.error(error);
        });
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['login']);
    }

    autologin() {
        const user: User = JSON.parse(localStorage.getItem('userData'));
        if (!user) {
            return;
        }
        if (user.token) {
            this.user.next(user);
        }
    }

    isAdmin(): boolean {
        return this.user.getValue() && this.user.getValue().roles.includes('ROLE_ADMIN');
    }

    isNoteOwner(note: Note): boolean {
        return this.user.getValue() && this.user.getValue().id === note.user.id;
    }

}
