import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

    constructor(private authService: AuthService) { }

}
