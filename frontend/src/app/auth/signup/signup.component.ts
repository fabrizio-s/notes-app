import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    @ViewChild('signupForm', {static: false}) signupForm: NgForm;

    constructor(private authService: AuthService, private router: Router) { }

    signup(form: NgForm) {
        console.log(form);
    }

    navigateLogin() {
        this.router.navigate(['login']);
    }

}
