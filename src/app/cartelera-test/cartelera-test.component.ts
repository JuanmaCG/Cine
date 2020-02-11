import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera-test',
  templateUrl: './cartelera-test.component.html',
  styleUrls: ['./cartelera-test.component.css']
})
export class CarteleraTestComponent implements OnInit {

  movies = []

  constructor(private movieService: MovieService, private route: Router) { }

  ngOnInit() {
    this.movies = []
    this.movies = this.movieService.getMovies()
  }

  toDetails(title: string) {
    this.route.navigate(['/cartelera', title])
  }

}
