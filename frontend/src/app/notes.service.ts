import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {

    notes: {title: string, user: any, body: string}[];

    constructor(private http: HttpClient) {
        this.http.get<{title: string, user: any, body: string}[]>('/rest/note').subscribe(
            notes => {
                this.notes = notes;
            }
        );
    }

    addNote(note: {title: string, user: any, body: string}): void {
        this.notes.push(note);
    }

}
