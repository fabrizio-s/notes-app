import { Component, OnInit } from '@angular/core';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(new AuthActions.AutoLogin());
    }

}
