import { Component, OnInit, OnDestroy } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Note } from 'src/app/home/note/note.model';
import { NgForm } from '@angular/forms';
import { NoteService } from 'src/app/home/note/note.service';
import * as NoteActions from '../../note/store/note.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
})
export class ModifyModalComponent implements OnInit, OnDestroy {

  private index: number;
  private note: Note;
  private subscriptions = [];
  private defaultTitle: string;
  private defaultBody: string;
  private updateSuccess = false;
  private error = null;

  constructor(private noteService: NoteService,
              private modalRef: MDBModalRef,
              private store: Store) { }

  ngOnInit() {
    this.defaultTitle = this.note.title;
    this.defaultBody = this.note.body;
    this.subscriptions.push(
      this.noteService.successfullyUpdatedNote.subscribe(
        updatedNote => {
          this.updateSuccess = true;
          setTimeout(() => this.updateSuccess = false, 4000);
        }
      )
    );
    this.subscriptions.push(
      this.noteService.updateError.subscribe(
        error => {
          this.error = error;
          setTimeout(() => this.error = null, 4000);
        }
      )
    );
  }

  update(form: NgForm) {
    const note: Note = {
      id: this.note.id,
      title: form.value.title,
      user: this.note.user,
      body: form.value.body,
    };
    this.noteService.updateNote(this.index, note).subscribe(
      updatedNote => this.store.dispatch(new NoteActions.UpdateNote(updatedNote))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
