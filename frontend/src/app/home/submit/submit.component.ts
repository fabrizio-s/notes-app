import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note/note.service';
import { Note } from '../note/note.model';
import * as NoteActions from '../note/store/note.actions';
import { User } from 'src/app/shared/model/user.model';
import { Select, Store } from '@ngxs/store';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit, OnDestroy {

    @Select(AuthState.user) private user$: Observable<User>;

    private user: User = null;
    private subscriptions = [];
    private error = null;
    private saveSuccess = false;
    @ViewChild('form', {static: true}) private form: NgForm;

    constructor(private noteService: NoteService,
                private store: Store) { }

    ngOnInit() {
        this.subscriptions.push(this.user$.subscribe(user => this.user = user));
        this.subscriptions.push(
            this.noteService.successfullySavedNote.subscribe(
                savedNote => {
                    this.saveSuccess = true;
                    setTimeout(() => this.saveSuccess = false, 4000);
                    this.form.reset();
                }
            )
        );
        this.subscriptions.push(
            this.noteService.saveError.subscribe(
                error => {
                    this.error = error;
                    setTimeout(() => this.error = null, 4000);
                }
            )
        );
    }

    submit(form: NgForm) {
        const note: Note = {
            title: form.value.title,
            user: this.user,
            body: form.value.body,
        };
        this.noteService.saveNote(note).subscribe(savedNote => this.store.dispatch(new NoteActions.AddNote(savedNote)));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
