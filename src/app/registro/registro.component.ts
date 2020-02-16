import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private router: Router, private authService: AuthService, private db: AngularFirestore) { }

  public email: string = '';
  public password: string = '';
  public name: string = '';
  public registered: boolean = false;
  public registeredFail: boolean = false;

  registerForm: FormGroup;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }


  registerModal(content) {
    this.modalService.open(content, { centered: true});
  }
  
  onAddUser() {
    this.authService.registerUser(this.email, this.password)
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
            }).catch((error) => console.log('error', error));
          }
        });
      }).catch(err => this.registeredFail = true);
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
 
  onLoginRedirect(): void {
    this.router.navigate(['cartelera']);
  }

  closeModal() {
    this.modalService.dismissAll()
  }

}
