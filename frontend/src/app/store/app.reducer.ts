import * as fromNotes from '../note/store/notes.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    notes: fromNotes.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    notes: fromNotes.notesReducer,
    auth: fromAuth.authReducer
};
