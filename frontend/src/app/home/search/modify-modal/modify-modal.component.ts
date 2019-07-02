import { Component, ViewChild, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Note } from 'src/app/note/note.model';
import { NgForm } from '@angular/forms';
import { NoteService } from 'src/app/note/note.service';

@Component({
  selector: 'app-modify-modal',
  templateUrl: './modify-modal.component.html',
})
export class ModifyModalComponent implements OnInit {

  index: number;
  note: Note;
  defaultTitle: string;
  defaultBody: string;

  constructor(private noteService: NoteService, public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.defaultTitle = this.note.title;
    this.defaultBody = this.note.body;
  }

  update(form: NgForm) {
    const note: Note = {
      id: this.note.id,
      title: form.value.title,
      user: this.note.user,
      body: form.value.body,
    };
    this.noteService.updateNote(this.index, note);
  }

}
