import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { CarteleraComponent } from "./cartelera/cartelera.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { ErrorComponent } from './error/error.component';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);


const routes: Routes = [
  {path: '', component: CarteleraComponent},
  {path: 'profile', component: UserProfileComponent, ...canActivate(redirectUnauthorizedToLanding)},
  {path: 'login', component: LoginComponent},
  {path: 'movie/:title', component: MovieDetailsComponent},
  {path: "**", component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
