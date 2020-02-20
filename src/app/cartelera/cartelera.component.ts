import { Component, OnInit } from "@angular/core";
import { MovieService } from "../movie.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-cartelera",
  templateUrl: "./cartelera.component.html",
  styleUrls: ["./cartelera.component.css"]
})
export class CarteleraComponent implements OnInit {
  isLogged: boolean = false;
  movies = [];
  movieExist: boolean = false;
  movieCorrect: boolean = false;
  movieSearch: string;

  constructor(
    public movieService: MovieService,
    private db: AngularFirestore,
    private af: AngularFireAuth,
    private route: Router,
    private authService: AuthService
    
  ) {this.isAuth()}

  ngOnInit() {
    this.movies = [];
    this.movies = this.movieService.getMovies();
  }
  

  //Buscamos el usuario activo y su respectiva coleccion para añadirle la pelicula a favoritos
  //Cuando la pelicula es añadida actualizamos la pagina y cambiamos el valor de la variable para mostrar el alert

  addToFav(movie) {
    this.af.user.subscribe(user => {
      this.db
        .collection(user.email)
        .doc(movie.Title)
        .snapshotChanges()
        .subscribe(data => {
          if (data.payload.exists) {
            this.movieExist = true;
            setTimeout(() => {
              this.movieExist = false;
              window.location.reload()
            }, 2000);
          } else {
            this.movieService.addToFavorite(movie, user);
            this.movieCorrect = true;
            setTimeout(() => {
              this.movieCorrect = false;
              window.location.reload()
            }, 2000);
          }
        });
    });
  }

  isAuth() {
    this.authService.isAuth().subscribe(auth => {
      if (auth == null) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
      }
    });
  }
  
  searchMovie(title: string){
    this.route.navigate(['/movie', title])
  }
}
