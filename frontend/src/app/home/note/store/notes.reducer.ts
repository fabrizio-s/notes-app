import * as NoteActions from './note.actions';
import { Note } from '../note.model';

export interface State {
    notes: Note[];
}

const initialState: State = {
    notes: []
};

export function notesReducer(state: State = initialState, action: NoteActions.AnyAction) {
    switch (action.type) {
        case NoteActions.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
        case NoteActions.UPDATE_NOTE:
            const note = state.notes[action.payload.index];
            const updatedNote = {
                ...note,
                ...action.payload.note
            };
            const updatedNotes = [...state.notes];
            updatedNotes[action.payload.index] = updatedNote;
            return {
                ...state,
                notes: updatedNotes
            };
        case NoteActions.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(
                    // tslint:disable-next-line: no-shadowed-variable
                    note => note.id !== action.payload.note.id
                )
            };
        case NoteActions.FETCH_NOTES:
            return {
                ...state,
                notes: [...action.payload]
            };
        default:
            return state;
    }
}
