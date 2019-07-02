import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NoteService {

    notes: Note[];
    fetch = new Subject<void>();
    note = new Subject<Note>();
    error = new Subject<any>();

    constructor(private http: HttpClient) { }

    saveNote(note: Note) {
        this.http.post<Note>('/rest/note', note).subscribe(
            savedNote => {
                this.note.next(savedNote);
                this.notes.push(savedNote);
            },
            error => {
                this.error.next(error);
            }
        );
    }

    updateNote(index: number, note: Note) {
        this.http.put<Note>('/rest/note/' + note.id, note).subscribe(
            updatedNote => {
                if (this.notes[index].id === updatedNote.id) {
                    this.notes[index].title = updatedNote.title;
                    this.notes[index].body = updatedNote.body;
                } else {
                    this.fetchNotes();
                }
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
