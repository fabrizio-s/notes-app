import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './home/search/search.component';
import { SubmitComponent } from './home/submit/submit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './pipe/shorten.pipe';
import { NoteFilter } from './pipe/note-filter.pipe';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReadComponent } from './home/read/read.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadComponent,
    SearchComponent,
    SubmitComponent,
    LoginComponent,
    SignupComponent,
    ShortenPipe,
    NoteFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
