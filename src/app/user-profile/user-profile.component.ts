import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  movies = []
  deleteMovieDone: boolean;

  constructor(private movieService: MovieService) { }

  //Inicializamos el componente con las peliculas favoritas de cada usuario
  ngOnInit() {
    this.movies = this.movieService.getMoviesDb()
  }


  //Borra la pelicula deseada de favoritos y de la base de datos
  deleteMovie(title: string) {
   this.movieService.deleteFavMovie(title)
   setTimeout(() => {
    this.deleteMovieDone = true;
    window.location.reload()
  }, 2000);
   
  }

}
