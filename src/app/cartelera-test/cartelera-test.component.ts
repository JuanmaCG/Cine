import { Component, OnInit } from "@angular/core";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-cartelera-test",
  templateUrl: "./cartelera-test.component.html",
  styleUrls: ["./cartelera-test.component.css"]
})
export class CarteleraTestComponent implements OnInit {
  movies = [];
  movieExist: boolean = false;
  movieCorrect: boolean = false;

  constructor(
    public movieService: MovieService,
    private db: AngularFirestore,
    private af: AngularFireAuth,
    private route: Router
  ) {}

  ngOnInit() {
    this.movies = [];
    this.movies = this.movieService.getMovies();
  }

  addToFav(movie) {
    this.af.user.subscribe(user => {
      console.log(user)
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
}
