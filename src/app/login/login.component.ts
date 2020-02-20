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
  public err;

  ngOnInit() {}

  //Mediante el metodo proporcionado por firebase le pasamos el email y password y redirigimos a la pagina de cartelera

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.err = "Este email no existe en nuestra base de datos");
  }

  /* Metodo de autentificacion de google el cual abre un popup que nos permite loguearnos con gmail
     Una vez logueado le decimos a firestore que cree una coleccion que se llamara igual que el correo 
     para guardar las peliculas en favoritos.*/

  onLoginGoogle(): void {
    this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider()).then((credential) => {
      this.afs.doc(credential.user.email + '/data').set({
        email: credential.user.email
      });
      this.onLoginRedirect()
    })
    
  }

  // Termina la sesion actual
  onLogout() {
    this.authService.logoutUser();
  }

  //Redirige a la pagina principal
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }

}
