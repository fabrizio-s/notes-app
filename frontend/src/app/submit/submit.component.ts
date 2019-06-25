import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Note } from '../note';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit, OnDestroy {

    saveSub: Subscription;
    errorSub: Subscription;
    error = null;
    saveSuccess = false;
    @ViewChild('form', {static: true}) form: NgForm;

    constructor(private notesService: NotesService) { }

    ngOnInit() {
        this.saveSub = this.notesService.note.subscribe(
            savedNote => {
                this.saveSuccess = true;
                setTimeout(() => this.saveSuccess = false, 4000);
                this.form.reset();
            }
        );
        this.errorSub = this.notesService.error.subscribe(
            error => {
                this.error = error;
                setTimeout(() => this.error = null, 4000);
            }
        );
    }

    submit(form: NgForm) {
        const note: Note = {
            id: form.value.id,
            title: form.value.title,
            user: {
                id: 1
            },
            body: form.value.body,
        };
        this.notesService.saveNote(note);
    }

    ngOnDestroy() {
        this.saveSub.unsubscribe();
        this.errorSub.unsubscribe();
    }

}
