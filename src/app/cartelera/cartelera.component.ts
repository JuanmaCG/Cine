import { Component, OnInit } from '@angular/core';
import { MovieService } from "../movie.service";

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {

  movies = []
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies()
  }

}
