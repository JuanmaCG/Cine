import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService, private db: AngularFirestore) { 
    {
      this.registerForm = new FormGroup({
        'name':new FormControl('',  [Validators.required,Validators.maxLength(255)]),
        'password':new FormControl('',  [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
        'email':new FormControl('',  [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")]),
      })
    }
  }

  public submitted = false;
  public registered: boolean = false;
  public registeredFail: boolean = false;

  registerForm: FormGroup;


  ngOnInit() { 

  }

  //Creamos el modal y lo abrimos

  registerModal(content) {
    this.modalService.open(content, { centered: true });
  }


  /* Utilizamos el metodo de registro por correo de firebase al que le pasamos el email y la contraseña
  y creamos la coleccion en firestore con su correo */

  onAddUser() {
    this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        this.authService.isAuth().subscribe(user => {
          this.db.doc(user.email + '/data').set({
            email: user.email
          });
          if (user) {
            user.updateProfile({
              displayName: '',
            }).then(() => {
              this.registered = true;
            }).catch((error) => error);
          }
        });
      }).catch(err => this.registeredFail = true);
    this.onSubmit()
  }

  // Metodo para loguearse con google

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => err);
  }

  // Redirige a la cartelera
  onLoginRedirect(): void {
    this.router.navigate(['cartelera']);
  }

  //Cirerra el modal
  closeModal() {
    this.modalService.dismissAll()
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Parar si el formulario es invalido
    if (this.registerForm.invalid) {
      return;
    }
  }

}
