import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    @ViewChild('loginForm', {static: false}) loginForm: NgForm;

    constructor(private authService: AuthService, private router: Router) { }

    login(form: NgForm) {
        this.authService.login(form.value);
    }

    navigateSignup() {
        this.router.navigate(['signup']);
    }

}
