import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/store/auth.state';
import { NoteState } from './home/note/store/note.state';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, NoteState], { developmentMode: !environment.production }),
    AuthModule,
    HomeModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
