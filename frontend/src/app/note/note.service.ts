import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { Subject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NoteService {

    public successfullySavedNote = new Subject<Note>();
    public successfullyUpdatedNote = new Subject<Note>();
    public successfullyDeletedNote = new Subject<Note>();
    public saveError = new Subject<any>();
    public updateError = new Subject<any>();
    public deleteError = new Subject<any>();
    public fetchError = new Subject<any>();

    constructor(private http: HttpClient) { }

    saveNote(note: Note): Observable<Note> {
        return this.http.post<Note>('/rest/note', note).pipe(
            catchError(
                error => {
                    console.error(error);
                    this.saveError.next(error);
                    return throwError(error);
                }
            ),
            tap(savedNote => this.successfullySavedNote.next(savedNote))
        );
    }

    updateNote(index: number, note: Note): Observable<Note> {
        return this.http.put<Note>('/rest/note/' + note.id, note).pipe(
            catchError(
                error => {
                    console.error(error);
                    this.updateError.next(error);
                    return throwError(error);
                }
            ),
            tap(updatedNote => this.successfullyUpdatedNote.next(updatedNote))
        );
    }

    deleteNote(index: number, note: Note): Observable<Note> {
        return this.http.delete<Note>('/rest/note/' + note.id).pipe(
            catchError(
                error => {
                    console.log(error);
                    this.deleteError.next(error);
                    return throwError(error);
                }
            ),
            tap(deletedNote => this.successfullyDeletedNote.next(deletedNote))
        );
    }

    fetchNotes(): Observable<Note[]> {
        return this.http.get<Note[]>('/rest/note').pipe(
            catchError(
                error => {
                    console.error(error);
                    this.fetchError.next(error);
                    return throwError(error);
                }
            )
        );
    }

}
