import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NoteService } from './note/note.service';
import { Store } from '@ngrx/store';
import { Note } from './note/note.model';
import * as NoteActions from './note/store/note.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService,
                private noteService: NoteService,
                private store: Store<{notes: {notes: Note[]}}>) { }

    ngOnInit() {
        this.authService.autologin();
    }

}
