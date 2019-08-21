import { User } from 'src/app/shared/model/user.model';
import { LoginCredentials, SignUpCredentials } from '../auth.model';

export const LOGIN = '[Auth] Login';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const SIGN_UP = '[Auth] Sign Up';

export class Login {
    static readonly type = LOGIN;
    constructor(public payload: LoginCredentials) { }
}

export class AuthenticateSuccess {
    static readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticateFail {
    static readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) { }
}

export class Logout {
    static readonly type = LOGOUT;
}

export class AutoLogin {
    static readonly type = AUTO_LOGIN;
}

export class ClearError {
    static readonly type = CLEAR_ERROR;
}

export class SignUp {
    static readonly type = SIGN_UP;
    constructor(public payload: SignUpCredentials) { }
}
