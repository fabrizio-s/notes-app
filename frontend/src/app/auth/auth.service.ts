import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fromApp from 'src/app/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any;
    // public error = new Subject<any>();

    constructor(private http: HttpClient,
                private store: Store<fromApp.AppState>) { }

    setLogoutTimer(duration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, duration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

}
