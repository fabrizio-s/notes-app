import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

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

    constructor(private notesService: NotesService) { }

    ngOnInit() {
        this.fetchSub = this.notesService.fetch.subscribe(
            () => {
                this.isLoading = false;
            }
        );
        this.deleteSub = this.notesService.note.subscribe(
            deletedNote => {
                this.deleteSuccess = true;
                setTimeout(() => this.deleteSuccess = false, 4000);
                this.isLoading = false;
            }
        );
        this.errorSub = this.notesService.error.subscribe(
            error => {
                this.error = error;
                setTimeout(() => this.error = null, 4000);
                this.isLoading = false;
            }
        );
    }

    deleteNote(index: number, note: Note) {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notesService.deleteNote(index, note);
        }
    }

    refresh() {
        this.isLoading = true;
        this.notesService.fetchNotes();
    }

    ngOnDestroy() {
        this.deleteSub.unsubscribe();
        this.errorSub.unsubscribe();
    }

}
