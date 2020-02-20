import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuth()
  }

  //Si el usuario esta logueado cambiamos el valor de la variable que nos permitirar mostrar botones para cada caso

  isAuth() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  onLogin() {
    this.router.navigate(['/login'])
  }

  // termina la sesion y redirige al login
  
  onLogOut() {
    this.authService.logoutUser().then(res => this.router.navigate(['/login']))
  }

}
