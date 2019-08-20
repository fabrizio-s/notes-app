import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchComponent } from './search/search.component';
import { SubmitComponent } from './submit/submit.component';
import { ModifyModalComponent } from './search/modify-modal/modify-modal.component';
import { ReadModalComponent } from './search/read-modal/read-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeComponent,
        SearchComponent,
        SubmitComponent,
        ModifyModalComponent,
        ReadModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HomeRoutingModule,
        // AngularFontAwesomeModule,
        MDBBootstrapModule.forRoot(),
        SharedModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    entryComponents: [
        ModifyModalComponent,
        ReadModalComponent
    ]
})
export class HomeModule { }
