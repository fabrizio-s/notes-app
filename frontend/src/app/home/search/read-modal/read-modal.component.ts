import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-read-modal',
  templateUrl: './read-modal.component.html',
})
export class ReadModalComponent {

  constructor(private modalRef: MDBModalRef) { }

}
