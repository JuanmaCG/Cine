import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'user', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
