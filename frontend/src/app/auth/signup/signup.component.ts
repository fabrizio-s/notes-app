import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    @ViewChild('signupForm', {static: false}) signupForm: NgForm;

    constructor(private store: Store,
                private router: Router) { }

    signup(form: NgForm) {
        this.store.dispatch(new AuthActions.SignUp({
            username: form.value.username,
            email: form.value.email,
            password: form.value.password
        }));
        form.reset();
    }

    navigateLogin() {
        this.store.dispatch(new AuthActions.ClearError());
        this.router.navigate(['auth', 'login']);
    }

}
