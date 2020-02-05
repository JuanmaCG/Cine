import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  public email: string = '';
  public password: string = '';


  ngOnInit() {
  }

  
  onAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          if (user) {
            user.updateProfile({
              name: '', 
            }).then(() => {
              this.router.navigate(['admin/list-books']);
            }).catch((error) => console.log('error', error));
          }
        });
      }).catch(err => console.log('err', err.message));
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
 
  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }


}
