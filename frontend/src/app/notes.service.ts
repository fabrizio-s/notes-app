import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note';
import { Subject } from 'rxjs';

@Injectable()
export class NotesService {

    notes: Note[];
    fetch = new Subject<void>();
    note = new Subject<Note>();
    error = new Subject<any>();

    constructor(private http: HttpClient) {
        this.http.get<Note[]>('/rest/note').subscribe(
            notes => {
                this.notes = notes;
            },
            error => {
                console.error(error);
            }
        );
    }

    addNote(note: Note): void {
        this.notes.push(note);
    }

    saveNote(note: Note) {
        this.http.post<Note>('/rest/note', note).subscribe(
            savedNote => {
                this.note.next(savedNote);
                this.addNote(savedNote);
            },
            error => {
                this.error.next(error);
            }
        );
    }

    fetchNotes() {
        this.http.get<Note[]>('/rest/note').subscribe(
            notes => {
                this.notes = notes;
                this.fetch.next();
            },
            error => {
                this.error.next(error);
            }
        );
    }

    deleteNote(index: number, note: Note) {
        this.http.delete<Note>('/rest/note/' + note.id).subscribe(
            deletedNote => {
                if (this.notes[index].id === deletedNote.id) {
                    this.notes.splice(index, 1);
                } else {
                    this.fetchNotes();
                }
                this.note.next(deletedNote);
            },
            error => {
                this.error.next(error);
            }
        );
    }

}
