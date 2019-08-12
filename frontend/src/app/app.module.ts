import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './home/search/search.component';
import { SubmitComponent } from './home/submit/submit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShortenPipe } from './pipe/shorten.pipe';
import { NoteFilter } from './pipe/note-filter.pipe';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModifyModalComponent } from './home/search/modify-modal/modify-modal.component';
import { ReadModalComponent } from './home/search/read-modal/read-modal.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    SearchComponent,
    SubmitComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    ModifyModalComponent,
    ReadModalComponent,
    ShortenPipe,
    NoteFilter,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffect]),
    AngularFontAwesomeModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    ModifyModalComponent,
    ReadModalComponent
  ]
})
export class AppModule { }
