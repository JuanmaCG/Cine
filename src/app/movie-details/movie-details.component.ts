import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieExist: boolean = false;
  movieCorrect: boolean = false;
  movie: any;
  isLogged: boolean = false;


  constructor(private route: ActivatedRoute, private authService: AuthService, private movieService: MovieService, private db: AngularFirestore, private af: AngularFireAuth) { }

  //inicializamos la pelicula mandada por router para cargarla al inicio del componente

  ngOnInit() {
    this.movieService.getMovieByTitle(this.route.snapshot.params['title']).subscribe(data => this.movie = data)
    this.isAuth()
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

  addToFav() {
    this.af.user.subscribe(user => {
      this.db
        .collection(user.email)
        .doc(this.movie.Title)
        .snapshotChanges()
        .subscribe(data => {
          if (data.payload.exists) {
            this.movieExist = true;
            setTimeout(() => {
              this.movieExist = false;
              window.location.reload()
            }, 2000);
          } else {
            this.movieService.addToFavorite(this.movie, user);
            this.movieCorrect = true;
            setTimeout(() => {
              this.movieCorrect = false;
              window.location.reload()
            }, 2000);
          }
        });
    });
  }

}
