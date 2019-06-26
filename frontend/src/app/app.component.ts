import { Component } from '@angular/core';
import { NotesService } from './notes.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NotesService, AuthService]
})
export class AppComponent {

  constructor(private authService: AuthService) { }

}
