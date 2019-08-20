import { Component, OnInit } from '@angular/core';
import { NoteService } from './note/note.service';
import { Store } from '@ngrx/store';
import * as NoteActions from './note/store/note.actions';
import * as fromApp from 'src/app/app.reducer';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private noteService: NoteService,
                private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.noteService.fetchNotes().subscribe(notes => this.store.dispatch(new NoteActions.FetchNotes(notes)));
    }

}
