import { NgModule } from '@angular/core';
import { Shorten } from './pipe/shorten.pipe';
import { NoteFilter } from './pipe/note-filter.pipe';
import { LoadingSpinnerComponent } from './component/loading-spinner/loading-spinner.component';
import { AlertComponent } from './component/alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';

@NgModule({
    declarations: [
        Shorten,
        NoteFilter,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    exports: [
        Shorten,
        NoteFilter,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    entryComponents: [
        AlertComponent
    ]
})
export class SharedModule { }
