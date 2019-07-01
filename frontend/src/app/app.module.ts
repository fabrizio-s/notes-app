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
    ShortenPipe,
    NoteFilter,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
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
    AlertComponent
  ]
})
export class AppModule { }
