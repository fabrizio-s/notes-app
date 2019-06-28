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
            this.user.next(user);
            this.router.navigate(['']);
        },
        error => {
            console.error(error);
        });
    }

    isAdmin(): boolean {
        return this.user.getValue() && this.user.getValue().roles.includes('ROLE_ADMIN');
    }

    isNoteOwner(note: Note): boolean {
        return this.user.getValue() && this.user.getValue().id === note.user.id;
    }

}
