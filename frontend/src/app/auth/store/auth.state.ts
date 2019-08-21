import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from 'src/app/shared/model/user.model';
import { AuthenticateSuccess, AuthenticateFail, Login, Logout, ClearError, SignUp, AutoLogin } from './auth.actions';
import { AuthService } from '../auth.service';
import { NgZone } from '@angular/core';

export interface AuthStateModel {
    user: User;
    loading: boolean;
    error: string;
}

const defaults: AuthStateModel = {
    user: null,
    loading: false,
    error: null
};

@State<AuthStateModel>({
    name: 'auth',
    defaults
})
export class AuthState {

    constructor(private authService: AuthService,
                private ngZone: NgZone) { }

    @Selector()
    static user(state: AuthStateModel) {
        return state.user;
    }

    @Selector()
    static loading(state: AuthStateModel) {
        return state.loading;
    }

    @Selector()
    static error(state: AuthStateModel) {
        return state.error;
    }

    @Action(AuthenticateSuccess)
    authenticateSuccess(context: StateContext<AuthStateModel>, action: AuthenticateSuccess) {
        this.ngZone.run(() => this.authService.redirect());
        const user = new User(
            action.payload.id,
            action.payload.username,
            action.payload.email,
            action.payload.roles,
            action.payload.token
        );
        context.patchState({
            user,
            loading: false,
            error: null
        });
    }

    @Action(AuthenticateFail)
    authenticateFail(context: StateContext<AuthStateModel>, action: AuthenticateFail) {
        context.patchState({
            user: null,
            loading: false,
            error: action.payload
        });
    }

    @Action(Login)
    login(context: StateContext<AuthStateModel>, action: Login) {
        this.authService.login(action.payload);
        context.patchState({
            loading: true,
            error: null
        });
    }

    @Action(Logout)
    logout(context: StateContext<AuthStateModel>, action: Logout) {
        this.ngZone.run(() => this.authService.logout());
        context.patchState({
            user: null
        });
    }

    @Action(ClearError)
    clearError(context: StateContext<AuthStateModel>, action: ClearError) {
        context.patchState({
            error: null
        });
    }

    @Action(SignUp)
    signUp(context: StateContext<AuthStateModel>, action: SignUp) {
        this.authService.signup(action.payload);
    }

    @Action(AutoLogin)
    autologin(context: StateContext<AuthStateModel>, action: AutoLogin) {
        this.authService.autologin();
    }

}
