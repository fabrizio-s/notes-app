import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NoteService } from '../note/note.service';
import { Store } from '@ngrx/store';
import { Note } from '../note/note.model';
import * as NoteActions from '../note/store/note.actions';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private noteService: NoteService,
                private store: Store<{notes: {notes: Note[]}}>) { }

    ngOnInit() {
        this.noteService.fetchNotes().subscribe(notes => this.store.dispatch(new NoteActions.FetchNotes(notes)));
    }

}
