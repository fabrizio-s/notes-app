import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NotesService {

    notes: Note[];
    fetch = new Subject<void>();
    note = new Subject<Note>();
    error = new Subject<any>();

    constructor(private http: HttpClient, private authService: AuthService) { }

    addNote(note: Note): void {
        this.notes.push(note);
    }

    saveNote(note: Note) {
        this.http.post<Note>('/rest/note', note, { headers: this.authorization() }).subscribe(
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
        this.http.get<Note[]>('/rest/note', { headers: this.authorization() }).subscribe(
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
        this.http.delete<Note>('/rest/note/' + note.id, { headers: this.authorization() }).subscribe(
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

    private authorization(): HttpHeaders {
        if (this.authService.user.getValue()) {
            return new HttpHeaders({
                Authorization: this.authService.user.getValue().token
            });
        } else {
            return new HttpHeaders();
        }
    }

}
