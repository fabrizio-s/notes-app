import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent {

    error = null;
    displaySuccess = false;

    constructor(private http: HttpClient, private notesService: NotesService) {}

    submit(form: NgForm) {
        const values: {id: number, title: string, user: any, body: string} = {
            id: form.value.id,
            title: form.value.title,
            user: {
                id: 1
            },
            body: form.value.body,
        };
        this.http.post<{id: number, title: string, user: any, body: string}>('/rest/note', values).subscribe(
            note => {
                this.notesService.addNote(note);
                this.displaySuccess = true;
                setTimeout(() => this.displaySuccess = false, 4000);
            },
            error => {
                this.error = error;
                setTimeout(() => this.error = null, 4000);
            }
        );
    }

}
