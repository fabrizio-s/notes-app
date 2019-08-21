import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Note } from '../note.model';
import { AddNote, FetchNotes, UpdateNote, DeleteNote } from './note.actions';

export interface NoteStateModel {
    notes: Note[];
}

const defaults: NoteStateModel = {
    notes: []
};

@State<NoteStateModel>({
    name: 'note',
    defaults
})
export class NoteState {

    @Selector()
    static notes(state: NoteStateModel) {
        return state.notes;
    }

    @Action(AddNote)
    addNote(context: StateContext<NoteStateModel>, action: AddNote) {
        const state = context.getState();
        context.patchState({ notes: [...state.notes, action.payload] });
    }

    @Action(FetchNotes)
    fetchNotes(context: StateContext<NoteStateModel>, action: FetchNotes) {
        context.patchState({ notes: [...action.payload] });
    }

    @Action(UpdateNote)
    updateNote(context: StateContext<NoteStateModel>, action: UpdateNote) {
        const state = context.getState();
        const updatedNotes = [...state.notes];
        const index = updatedNotes.findIndex(note => note.id === action.payload.id);
        const updatedNote = {
            ...action.payload
        };
        updatedNotes[index] = updatedNote;
        context.patchState({ notes: updatedNotes });
    }

    @Action(DeleteNote)
    deleteNote(context: StateContext<NoteStateModel>, action: DeleteNote) {
        const state = context.getState();
        const notes = [
            ...state.notes.filter(note => note.id !== action.payload.id)
        ];
        context.patchState({ notes });
    }

}
