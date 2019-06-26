import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    @ViewChild('loginForm', {static: false}) loginForm: NgForm;

    constructor(private authService: AuthService) { }

    login(form: NgForm) {
        this.authService.login(form.value);
    }

}
