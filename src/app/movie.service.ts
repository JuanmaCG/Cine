import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movies = [];
  url = ''

  constructor(private http: HttpClient) { 
    this.url = 'http://www.omdbapi.com/?apikey=a61fdc4a&'
  }

  getMovieByTitle(title: string) {
    return this.http.get(`${this.url}t=${title}`)
  }


  getMovies() {
    this.http.get(`${this.url}t=pokemon`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=the+fifth+element`).subscribe(data => this.movies.push(data))
    this.http.get(`${this.url}t=doraemon`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=dragon+ball`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=pulp+fiction`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=digimon`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=a+clockwork+orange`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=sweeney+todd`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=interstellar`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=grandfather`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=lemony+snicket's`).subscribe(data => this.movies.push(data))
    // this.http.get(`${this.url}t=nanatsu`).subscribe(data => this.movies.push(data))
    return this.movies
  }

  addToFavorite(movie) { 
    
  }
}
