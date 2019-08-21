import { Component, OnInit } from '@angular/core';
import { NoteService } from './note/note.service';
import * as NoteActions from './note/store/note.actions';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private noteService: NoteService,
                private store: Store) { }

    ngOnInit() {
        this.noteService.fetchNotes().subscribe(notes => this.store.dispatch(new NoteActions.FetchNotes(notes)));
    }

}
