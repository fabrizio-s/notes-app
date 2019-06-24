import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'noteFilter' })
export class NoteFilter implements PipeTransform {
    transform(notes: {title: string, user: {username: string}}[],
              enableFilterByTitle: boolean,
              filteredTitle: string,
              enableFilterByAuthor: boolean,
              filteredAuthor: string) {
        if (enableFilterByTitle && enableFilterByTitle) {
            return notes.filter(
                note => note.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) !== -1
                && note.user.username.toLowerCase().indexOf(filteredAuthor.toLowerCase()) !== -1
             );
        } else if (enableFilterByTitle) {
            return notes.filter(
                note => note.title.toLowerCase().indexOf(filteredTitle.toLowerCase()) !== -1
             );
        } else if (enableFilterByAuthor) {
            return notes.filter(
                note => note.user.username.toLowerCase().indexOf(filteredAuthor.toLowerCase()) !== -1
             );
        } else {
            return notes;
        }
    }
}
