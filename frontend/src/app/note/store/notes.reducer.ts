import * as NoteActions from './note.actions';

const initialState = {
    notes: []
};

export function notesReducer(state = initialState, action: NoteActions.AnyAction) {
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
                    (note, index) => index !== action.payload.index
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
