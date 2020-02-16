import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import { FirebaseAuth } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  movies = [];
  url = "";
  movie_in_db = false;
  

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private af: AngularFireAuth,
    private auth: AuthService
  ) {
    this.url = "http://www.omdbapi.com/?apikey=a61fdc4a&";

  }

  getMovieByTitle(title: string) {
    return this.http.get(`${this.url}t=${title}`);
  }

  getMovies() {
    this.movies = [];
    this.http
      .get(`${this.url}t=pokemon`)
      .subscribe(data => this.movies.push(data));
    this.http
      .get(`${this.url}t=the+fifth+element`)
      .subscribe(data => this.movies.push(data));
    this.http
      .get(`${this.url}t=doraemon`)
      .subscribe(data => this.movies.push(data));
    this.http
      .get(`${this.url}t=dragon+ball`)
      .subscribe(data => this.movies.push(data));
    // this.http.get(`${this.url}t=pulp+fiction`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=digimon`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=a+clockwork+orange`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=sweeney+todd`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=interstellar`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=grandfather`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=lemony+snicket's`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=nanatsu`).subscribe(data => this.movies.push(data))
    return this.movies;
  }

  addToFavorite(movie, user) {
    this.db.collection(user.email).doc(movie.Title).set(movie)
  }

  deleteFavMovie(title) {
  
    this.db.collection(this.af.auth.currentUser.email).doc(title).delete()


  }

 



  getMoviesDb() {
    let movies = [];
    this.af.user.subscribe(user => {
      this.db.collection(user.email).doc('data').delete()
      this.db
        .collection(user.email)
        .valueChanges()
        .subscribe(data => {
          data.forEach(doc => { 
            movies.push(doc);
          });
        });
    });
    return movies;
  }
}
