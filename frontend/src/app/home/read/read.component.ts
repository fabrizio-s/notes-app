import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.css']
})
export class ReadComponent {

    constructor(private authService: AuthService) { }

}
