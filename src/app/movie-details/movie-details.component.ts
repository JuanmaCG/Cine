import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovieByTitle(this.route.snapshot.params['title']).subscribe(data => this.movie = data)
  }

  

}
