import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../note/note.service';
import { Note } from '../note/note.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModifyModalComponent } from './modify-modal/modify-modal.component';
import { ReadModalComponent } from './read-modal/read-modal.component';
import { Store } from '@ngrx/store';
import * as NoteActions from '../note/store/note.actions';
import { finalize, map } from 'rxjs/operators';
import * as fromApp from 'src/app/app.reducer';
import { User } from 'src/app/shared/model/user.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    private subscriptions = [];
    private enableFilterByTitle = false;
    private enableFilterByAuthor = false;
    private filteredTitle = '';
    private filteredAuthor = '';
    private isLoading = false;
    private deleteSuccess = false;
    private error = null;
    private notes$: Observable<Note[]>;
    private user: User = null;

    constructor(private authService: AuthService,
                private noteService: NoteService,
                private mDBModalService: MDBModalService,
                private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.notes$ = this.store.select('notes').pipe(map(state => state.notes));
        this.subscriptions.push(this.store.select('auth').pipe(map(state => state.user)).subscribe(user => this.user = user));
        this.subscriptions.push(
            this.noteService.successfullyDeletedNote.subscribe(
                deletedNote => {
                    this.deleteSuccess = true;
                    setTimeout(() => this.deleteSuccess = false, 4000);
                }
            )
        );
        this.subscriptions.push(
            this.noteService.fetchError.subscribe(
                error => {
                    this.error = error;
                    setTimeout(() => this.error = null, 4000);
                }
            )
        );
        this.subscriptions.push(
            this.noteService.deleteError.subscribe(
                error => {
                    this.error = error;
                    setTimeout(() => this.error = null, 4000);
                }
            )
        );
    }

    readNote(note: Note) {
        this.mDBModalService.show(ReadModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-lg',
            animated: true,
            data: {
                note
            }
        });
    }

    updateNote(index: number, note: Note) {
        this.mDBModalService.show(ModifyModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-lg',
            animated: true,
            data: {
                index,
                note
            }
        });
    }

    deleteNote(index: number, note: Note) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.noteService.deleteNote(index, note).subscribe(
                deletedNote => this.store.dispatch(new NoteActions.DeleteNote({index, note: deletedNote}))
            );
        }
    }

    refresh() {
        this.isLoading = true;
        this.noteService.fetchNotes().pipe(finalize(() => this.isLoading = false)).subscribe(
            notes => this.store.dispatch(new NoteActions.FetchNotes(notes))
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    private isUserAdmin(): boolean {
        return !!this.user && this.user.roles.includes('ROLE_ADMIN');
    }

    private isUserNoteOwner(note: Note): boolean {
        return !!this.user && this.user.id === note.user.id;
    }

}
