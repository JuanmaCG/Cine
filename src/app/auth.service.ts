import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData)
        },
          err => reject(err));
    });
  }

  // logueo con gmail y creacion de la coleccion en firestore

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        this.afs.doc(credential.user.email + '/data').set({
          email: credential.user.email
        });
        this.updateUserData(credential.user)
      })
  }

  //Termina la sesion actual
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  //Comprueba si hay algun usuario autentificado
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  //Actualiza los datos en la base de datos del usuario

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      name: user.name
    }
    return userRef.set(data, { merge: true })
  }



}