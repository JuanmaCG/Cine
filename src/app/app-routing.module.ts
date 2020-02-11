import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { CarteleraTestComponent } from "./cartelera-test/cartelera-test.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cartelera/:title', component: MovieDetailsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  // {
  //   path: "cartelera",
  //   loadChildren: () => import('./cartelera/cartelera.module').then(m => m.CarteleraModule)
  // }
  {path: 'cartelera', component: CarteleraTestComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
