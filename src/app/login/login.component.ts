import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService, private afs: AngularFirestore) { }
  public email: string = '';
  public password: string = '';
  err;
  ngOnInit() {
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.err = "Este email no existe en nuestra base de datos");
  }

  onLoginGoogle(): void {
    this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider()).then((credential) => {
      this.afs.doc(credential.user.email + '/data').set({
        email: credential.user.email
      });
      this.onLoginRedirect()
    })
    
  }

  onLogout() {
    this.authService.logoutUser();
  }

  onLoginRedirect(): void {
    this.router.navigate(['']);
  }

}
