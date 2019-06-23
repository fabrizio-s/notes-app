import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {

    notes: Map<number, {id: number, title: string, user: any, body: string}>;

    constructor(private http: HttpClient) {
        this.http.get<{id: number, title: string, user: any, body: string}[]>('/rest/note').subscribe(
            notes => {
                this.notes = new Map(notes.map((note): [number, {id: number, title: string, user: any, body: string}] => [note.id, note]));
            }
        );
    }

    addNote(note: {id: number, title: string, user: any, body: string, date: Date}): void {
        this.notes.set(note.id, note);
    }

}
