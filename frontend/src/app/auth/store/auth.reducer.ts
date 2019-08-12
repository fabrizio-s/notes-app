import { User } from 'src/app/user/user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User;
    loading: boolean;
    error: string;
}

const initialState: State = {
    user: null,
    loading: false,
    error: null
};

export function authReducer(state = initialState, action: AuthActions.AnyAction) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.id,
                action.payload.username,
                action.payload.email,
                action.payload.roles,
                action.payload.token);
            return {
                ...state,
                user,
                loading: false,
                error: null
            };
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload
            };
        case AuthActions.LOGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case AuthActions.SIGN_UP:
        default:
            return state;
    }
}
