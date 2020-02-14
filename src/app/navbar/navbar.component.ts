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

  onLogOut() {
    this.authService.logoutUser().then(res => this.router.navigate(['/login']))
  }

}
