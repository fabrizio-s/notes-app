import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note/note.service';
import { Note } from '../note/note.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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

    constructor(private authService: AuthService, private noteService: NoteService) { }

    ngOnInit() {
        this.saveSub = this.noteService.note.subscribe(
            savedNote => {
                this.saveSuccess = true;
                setTimeout(() => this.saveSuccess = false, 4000);
                this.form.reset();
            }
        );
        this.errorSub = this.noteService.error.subscribe(
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
            user: this.authService.user.getValue(),
            body: form.value.body,
        };
        this.noteService.saveNote(note);
    }

    ngOnDestroy() {
        this.saveSub.unsubscribe();
        this.errorSub.unsubscribe();
    }

}
