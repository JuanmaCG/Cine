import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MovieService } from '../movie.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  movies = []
  deleteMovieDone: boolean;

  constructor( private movieService: MovieService) {  }

  ngOnInit() {
    this.movies = this.movieService.getMoviesDb()
  }

  deleteMovie(title: string) {
    this.movieService.deleteFavMovie(title)
  } 

}
