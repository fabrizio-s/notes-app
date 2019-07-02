import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../../note/note.service';
import { Note } from '../../note/note.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { MDBModalService } from 'angular-bootstrap-md';
import { ModifyModalComponent } from './modify-modal/modify-modal.component';
import { ReadModalComponent } from './read-modal/read-modal.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    userSub: Subscription;
    fetchSub: Subscription;
    deleteSub: Subscription;
    errorSub: Subscription;
    enableFilterByTitle = false;
    enableFilterByAuthor = false;
    filteredTitle = '';
    filteredAuthor = '';
    isLoading = false;
    deleteSuccess = false;
    error = null;

    constructor(private authService: AuthService, private noteService: NoteService, private mDBModalService: MDBModalService) { }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(
            user => {
                if (user) {
                    this.noteService.fetchNotes();
                }
            }
        );
        this.fetchSub = this.noteService.fetch.subscribe(
            () => {
                this.isLoading = false;
            }
        );
        this.deleteSub = this.noteService.note.subscribe(
            deletedNote => {
                this.deleteSuccess = true;
                setTimeout(() => this.deleteSuccess = false, 4000);
                this.isLoading = false;
            }
        );
        this.errorSub = this.noteService.error.subscribe(
            error => {
                this.error = error;
                setTimeout(() => this.error = null, 4000);
                this.isLoading = false;
            }
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
            this.noteService.deleteNote(index, note);
        }
    }

    refresh() {
        this.isLoading = true;
        this.noteService.fetchNotes();
    }

    ngOnDestroy() {
        this.deleteSub.unsubscribe();
        this.errorSub.unsubscribe();
        this.userSub.unsubscribe();
        this.fetchSub.unsubscribe();
    }

}
