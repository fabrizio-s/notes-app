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

    constructor(private http: HttpClient, private notesService: NotesService) {}

    submit(form: NgForm) {
        const values: {title: string, user: any, body: string} = {
            title: form.value.title,
            user: {
                id: 1
            },
            body: form.value.body,
        };
        this.http.post('/rest/note', values).subscribe(
            response => {
                this.notesService.addNote(values);
            }
        );
    }

}
