import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { User } from 'src/app/user/user.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    private user: User = null;
    private subscriptions: Subscription[] = [];

    constructor(private store: Store<fromApp.AppState>,
                private authService: AuthService) { }

    ngOnInit() {
        this.subscriptions.push(this.store.select('auth').pipe(map(state => state.user)).subscribe(user => this.user = user));
    }

    private logout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
