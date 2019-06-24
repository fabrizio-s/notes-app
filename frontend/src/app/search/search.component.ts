import { Component } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

    constructor(private notesService: NotesService) {}

}
