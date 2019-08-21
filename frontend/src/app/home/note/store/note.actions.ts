import { Note } from '../note.model';

export const ADD_NOTE = '[Note] Add Note';
export const FETCH_NOTES = '[Note] Fetch Notes';
export const UPDATE_NOTE = '[Note] Update Note';
export const DELETE_NOTE = '[Note] Delete Note';

export class AddNote {
    static readonly type = ADD_NOTE;
    constructor(public payload: Note) { }
}

export class FetchNotes {
    static readonly type = FETCH_NOTES;
    constructor(public payload: Note[]) { }
}

export class UpdateNote {
    static readonly type = UPDATE_NOTE;
    constructor(public payload: Note) { }
}

export class DeleteNote {
    static readonly type = DELETE_NOTE;
    constructor(public payload: Note) { }
}
