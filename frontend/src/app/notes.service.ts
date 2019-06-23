export class NotesService {

    notes: {title: string, author: string, body: string, date: Date}[] = [];

    addNote(note: {title: string, author: string, body: string, date: Date}): void {
        this.notes.push(note);
    }

}
