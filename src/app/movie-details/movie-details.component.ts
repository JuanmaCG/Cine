import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: any;
  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit() {
    console.log()
    this.movieService.getMovieByTitle(this.route.snapshot.params['title']).subscribe(data => this.movie = data)
  }

  

}
