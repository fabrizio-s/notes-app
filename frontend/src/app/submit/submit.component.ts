import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent {

    constructor(private notesService: NotesService) {}

    submit(form: NgForm) {
        const values = form.value;
        const note: {title: string, author: string, body: string, date: Date} = {
            title: values.title,
            author: values.author,
            body: values.body,
            date: new Date()
        };
        this.notesService.addNote(note);
    }

}
