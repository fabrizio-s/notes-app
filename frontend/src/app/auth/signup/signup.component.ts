import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    @ViewChild('signupForm', {static: false}) signupForm: NgForm;

    constructor(private store: Store<fromApp.AppState>,
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
        this.router.navigate(['login']);
    }

}
