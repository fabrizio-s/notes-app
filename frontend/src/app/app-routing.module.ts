import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './home/search/search.component';
import { SubmitComponent } from './home/submit/submit.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'submit', component: SubmitComponent, canActivate: [AuthGuard] },
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
