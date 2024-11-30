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
  totalPages: number = 0;
  pagesCounter: number = 1;

  totalPagesMovies: number = 0;
  pagesCounterMovies: number = 1;
  lang = localStorage.getItem('lang') || 'es-ES';

  constructor(private seriesAcc: SeriesAccountService, private serieService: SeriesService,private pipeDateForm: DateFormaterPipe) { }

  ngOnInit(): void {
    this.ratedMovies = [];
    this.ratedSeries = [];
    this.totalPages = 0;
    this.pagesCounter = 1;
    this.totalPagesMovies = 0;
    this.pagesCounterMovies = 1;
    this.getSeriesWithRating();
    this.getMoviesWithRating();
  }

  getSeriesWithRating(): void {
    
    this.seriesAcc.getUserRatings(this.pagesCounter).subscribe((data: RatedSerieResponse ) => {

      this.ratedSeries = this.ratedSeries.concat(data.results);
      this.totalPages = data.total_pages;

      if(this.pagesCounter <= this.totalPages){

        this.pagesCounter++;
        this.getSeriesWithRating();
        
      }

    });

  }

  getMoviesWithRating() {
    
    this.seriesAcc.getUserMoviesRatings(this.pagesCounterMovies).subscribe((data : RatedMoviesResponse) => {

      this.ratedMovies = this.ratedMovies.concat(data.results);
      this.totalPagesMovies = data.total_pages;

      if(this.pagesCounterMovies <= this.totalPagesMovies){

        this.pagesCounterMovies++;
        this.getMoviesWithRating();
        
      }

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



  

punctFormater(num: number): number{

  return num * 10;

}
dateFormater(date: string): string{
  
  return this.pipeDateForm.transform(date);
  
}

  changeRating(data : number){

    if(data === 0){
      this.cambio = 0;
      this.totalPages = 0;
      this.pagesCounter = 1;
      this.ratedSeries = [];
      this.getSeriesWithRating();
    }

    else{
      this.cambio = 1;
      this.totalPagesMovies = 0;
      this.pagesCounterMovies = 1;
      this.ratedMovies = [];
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