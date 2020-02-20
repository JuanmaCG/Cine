import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

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
  ) {
    this.url = "https://www.omdbapi.com/?apikey=a61fdc4a&";

  }

  getMovieByTitle(title: string) {
    return this.http.get(`${this.url}t=${title}`);
  }

  //Cargamos unas peliculas por defecto en nuestra cartelera
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
    this.http.get(`${this.url}t=pulp+fiction`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=digimon`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=a+clockwork+orange`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=sweeney+todd`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=interstellar`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=grandfather`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=lemony+snicket's`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=nanatsu`).subscribe(data => this.movies.push(data))
    return this.movies;
  }

  //Añade a la base de datos y a la coleccion del usuario la pelicula favorita
  addToFavorite(movie, user) {
    this.db.collection(user.email).doc(movie.Title).set(movie)
  }

  //Borra pelicula favorita
  deleteFavMovie(title) {
    this.db.collection(this.af.auth.currentUser.email).doc(title).delete()
  }




  //Devuelve las peliculas favoritas del usuario de la base de datos
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
