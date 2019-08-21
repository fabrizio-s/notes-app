import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { Subscription, Observable } from 'rxjs';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { Store, Select } from '@ngxs/store';
import { AuthState } from 'src/app/auth/store/auth.state';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    @Select(AuthState.user) private user$: Observable<User>;

    private user: User = null;
    private subscriptions: Subscription[] = [];

    constructor(private store: Store) { }

    ngOnInit() {
        this.subscriptions.push(this.user$.subscribe(user => this.user = user));
    }

    private logout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
