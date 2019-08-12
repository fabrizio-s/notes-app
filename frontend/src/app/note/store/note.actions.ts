import { Action } from '@ngrx/store';
import { Note } from '../note.model';

export const ADD_NOTE = '[Notes] Add Note';
export const FETCH_NOTES = '[Notes] Fetch Notes';
export const UPDATE_NOTE = '[Notes] Update Note';
export const DELETE_NOTE = '[Notes] Delete Note';

export class AddNote implements Action {
    readonly type = ADD_NOTE;
    constructor(public payload: Note) { }
}

export class FetchNotes implements Action {
    readonly type = FETCH_NOTES;
    constructor(public payload: Note[]) { }
}

export class UpdateNote implements Action {
    readonly type = UPDATE_NOTE;
    constructor(public payload: {index: number, note: Note}) { }
}

export class DeleteNote implements Action {
    readonly type = DELETE_NOTE;
    constructor(public payload: {index: number, note: Note}) { }
}

export type AnyAction = AddNote | UpdateNote | DeleteNote | FetchNotes;
