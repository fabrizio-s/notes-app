import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

    deleteSuccess = false;
    error = null;
    errorHandler = error => {
        this.error = error;
        setTimeout(() => this.error = null, 4000);
    }

    constructor(private notesService: NotesService, private http: HttpClient) {}

    deleteNote(index: number, note: {id: number}) {
        if (confirm("Are you sure you want to delete this note?")) {
            this.http.delete<{id: number}>('/rest/note/' + note.id).subscribe(
                deletedNote => {
                    if (this.notesService.notes[index].id === deletedNote.id) {
                        this.notesService.notes.splice(index, 1);
                    } else {
                        this.notesService.fetchNotes().subscribe(
                            notes => {
                                this.notesService.notes = notes;
                            },
                            this.errorHandler
                        );
                    }
                    this.deleteSuccess = true;
                    setTimeout(() => this.deleteSuccess = false, 4000);
                }, this.errorHandler
            );
        }
    }

}
