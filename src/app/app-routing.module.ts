import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { CarteleraTestComponent } from "./cartelera-test/cartelera-test.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";


const routes: Routes = [
  {path: '', component: CarteleraTestComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'movie/:title', component: MovieDetailsComponent},
  // {
  //   path: "cartelera",
  //   loadChildren: () => import('./cartelera/cartelera.module').then(m => m.CarteleraModule)
  // }
  // {path: 'cartelera', component: CarteleraTestComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
