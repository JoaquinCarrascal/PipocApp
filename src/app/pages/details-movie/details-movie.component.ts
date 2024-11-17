import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';
import { MovieDetailResponse } from '../../models/movies-details-response';
import { CastResponse, Cast } from '../../models/movie-cast-response';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css'
})
export class DetailsMovieComponent implements OnInit {
  movies: MovieDetailResponse[] = [];
  cast: Cast[] = [];
  originalTitle: string | undefined;
  status: string | undefined;
  originalLanguage: string | undefined;
  budget: number | undefined;
  revenue: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private detailsMovieService: DetailsMovieService
  ) { }

  ngOnInit(): void {
    const idMovie = this.route.snapshot.paramMap.get('idMovie');
    if (idMovie) {
      this.detailsMovieService.getMovieDetails(+idMovie).subscribe((data: MovieDetailResponse) => {
        this.movies = [data];
        this.originalTitle = data.original_title;
        this.status = data.status;
        this.originalLanguage = data.original_language;
        this.budget = data.budget;
        this.revenue = data.revenue;
      });
      this.getMovieCast(+idMovie);
    }
  }

  obtenerImagenPelicula(tam : number , path : string){
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  obtenerIconoGenero(genreName: string): string {
    switch (genreName.toLowerCase()) {
      case 'action':
        return 'https://fonts.gstatic.com/s/i/materialicons/sports_martial_arts/v6/24px.svg';
      case 'adventure':
        return 'https://fonts.gstatic.com/s/i/materialicons/explore/v6/24px.svg';
      case 'animation':
        return 'https://fonts.gstatic.com/s/i/materialicons/animation/v6/24px.svg';
      case 'comedy':
        return 'https://fonts.gstatic.com/s/i/materialicons/tag_faces/v6/24px.svg';
      case 'crime':
        return 'https://fonts.gstatic.com/s/i/materialicons/gavel/v6/24px.svg';
      case 'documentary':
        return 'https://fonts.gstatic.com/s/i/materialicons/emoji_objects/v6/24px.svg';
      case 'drama':
        return 'https://fonts.gstatic.com/s/i/materialicons/theater_comedy/v6/24px.svg';
      case 'family':
        return 'https://fonts.gstatic.com/s/i/materialicons/family_restroom/v6/24px.svg';
      case 'fantasy':
        return 'https://fonts.gstatic.com/s/i/materialicons/auto_awesome/v6/24px.svg';
      case 'history':
        return 'https://fonts.gstatic.com/s/i/materialicons/history/v6/24px.svg';
      case 'horror':
        return 'https://fonts.gstatic.com/s/i/materialicons/ghost/v6/24px.svg';
      case 'music':
        return 'https://fonts.gstatic.com/s/i/materialicons/music_note/v6/24px.svg';
      case 'mystery':
        return 'https://fonts.gstatic.com/s/i/materialicons/help_center/v6/24px.svg';
      case 'romance':
        return 'https://fonts.gstatic.com/s/i/materialicons/favorite/v6/24px.svg';
      case 'science fiction':
        return 'https://fonts.gstatic.com/s/i/materialicons/science/v6/24px.svg';
      case 'tv movie':
        return 'https://fonts.gstatic.com/s/i/materialicons/tv/v6/24px.svg';
      case 'thriller':
        return 'https://fonts.gstatic.com/s/i/materialicons/warning/v6/24px.svg';
      case 'war':
        return 'https://fonts.gstatic.com/s/i/materialicons/military_tech/v6/24px.svg';
      case 'western':
        return 'https://fonts.gstatic.com/s/i/materialicons/local_florist/v6/24px.svg';
      default:
        return 'https://fonts.gstatic.com/s/i/materialicons/help_outline/v6/24px.svg';
    }
  }  

  getMovieCast(id: number): void {
    this.detailsMovieService.getMovieCast(id).subscribe((data: CastResponse) => {
      this.cast = data.cast;
    });
  }

  obtenerColorCalificacion(voteAverage: number, index: number): string {
    const level = Math.ceil(voteAverage / 2);
    if (index < level) {
      return ''; // Green for high ratings
    } else {
      return 'brightness(0.2)'; // Darker color for unachieved levels
    }
  }

  getPopcornIcons(voteAverage: number): string[] {
    return Array.from({ length: 5 }, (_, index) => this.obtenerColorCalificacion(voteAverage, index));
  }

}
