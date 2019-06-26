import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Note } from './note';

@Injectable()
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) { }

    login(credentials: {username: string, password: string}) {
        this.http.get<User>('/api/authenticate?username=' + credentials.username + '&password=' + credentials.password)
        .subscribe(user => {
            this.user.next(user);
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
