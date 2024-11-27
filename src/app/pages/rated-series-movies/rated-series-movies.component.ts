import { Component, OnInit } from '@angular/core';
import { SeriesAccountService } from '../../services/series-account.service';
import { SeriesService } from '../../services/series.service';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { RatedSerieResponse, SerieResults } from '../../models/rated-serie.interface';
import { MovieResults, RatedMoviesResponse } from '../../models/rated-movies.interface';
import { Cast, Crew } from '../../models/movie-cast-response';

@Component({
  selector: 'app-rated-series',
  templateUrl: './rated-series-movies.component.html',
  styleUrls: ['./rated-series-movies.component.css']
})
export class RatedSeriesComponent implements OnInit {
  ratedSeries: SerieResults[] = [];

  ratedMovies : MovieResults [] = [];


  cast: Cast[] = [];
  crew: Crew[] = [];
  cambio : number = 0

  constructor(private seriesAcc: SeriesAccountService, private serieService: SeriesService,private pipeDateForm: DateFormaterPipe) { }

  ngOnInit(): void {
    this.getSeriesWithRating();
    this.getMoviesWithRating();
  }

  getSeriesWithRating(): void {
    this.seriesAcc.getUserRatings().subscribe((data: RatedSerieResponse ) => {
      this.ratedSeries = data.results;
    });
  }

  getMoviesWithRating() {
    this.ratedMovies = [];
    this.seriesAcc.getUserMoviesRatings().subscribe((data : RatedMoviesResponse) => {
      this.ratedMovies = data.results;
    });
  }

  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  deleteSeriesRating(serieId: number) {
    this.seriesAcc.deleteSerieRating(serieId).subscribe(() => {
      this.getSeriesWithRating();
    });
  }

  deleteMovieRating(movieId: number) {
    this.seriesAcc.deleteMovieRating(movieId).subscribe(() => {
      this.ngOnInit()
    });
  }

  

punctFormater(num: number): number{

  return num * 10;

}
dateFormater(date: string): string{
  
  return this.pipeDateForm.transform(date);
  
}

  changeRating(data : number){

    if(data === 0){
      this.cambio = 0;
      this.getSeriesWithRating();
    }

    else{
      this.cambio = 1;
      this.getMoviesWithRating();
    }

  }

  obtenerColorCalificacion(userRating: number, index: number): string {
    if (index < userRating) {
      return '';
    } else {
      return 'brightness(0.2)';
    }
  }

  getPopcornIcons(userRating: number): string[] {
    return Array.from({ length: 10 }, (_, index) => this.obtenerColorCalificacion(userRating, index));
  }
  getDirectors(): Crew[] {
    return this.crew.filter(member => member.known_for_department === 'Directing');
  }
  
  
}