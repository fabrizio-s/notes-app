import { Action } from '@ngrx/store';
import { User } from 'src/app/user/user.model';

export const LOGIN = '[Auth] Login';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const SIGN_UP = '[Auth] Sign Up';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {username: string; password: string}) { }
}

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class SignUp implements Action {
    readonly type = SIGN_UP;
    constructor(public payload: {username: string; email: string; password: string}) { }
}

export type AnyAction = Login | AuthenticateSuccess | AuthenticateFail | Logout | AutoLogin | ClearError | SignUp;
