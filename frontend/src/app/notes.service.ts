import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {

    notes: {id: number, title: string, user: any, body: string}[];

    constructor(private http: HttpClient) {
        this.loadNotes();
    }

    addNote(note: {id: number, title: string, user: any, body: string}): void {
        this.notes.push(note);
    }

    loadNotes() {
        this.fetchNotes().subscribe(
            notes => {
                this.notes = notes;
            }
        );
    }

    fetchNotes() {
        return this.http.get<{id: number, title: string, user: any, body: string}[]>('/rest/note');
    }

}
