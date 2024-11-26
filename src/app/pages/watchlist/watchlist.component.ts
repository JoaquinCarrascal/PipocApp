import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchlistMovies } from '../../models/watchlist-movie.interface'
import { WatchlistSeries } from '../../models/watchlist-series.interface';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlistMovie: WatchlistMovies[] = [];
  watchlistSeries: WatchlistSeries[] = [];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.watchlistService.getWatchlistMovies().subscribe((response) => {
      this.watchlistMovie = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  clickMovieSerie(isMovie: boolean): void {
    if (isMovie) {
      this.watchlistService.getWatchlistMovies().subscribe((response) => {
        this.watchlistMovie = response.results;
      });
      this.watchlistSeries = [];
    } else {
      this.watchlistService.getWatchlistSeries().subscribe((response) => {
        this.watchlistSeries = response.results;
      });
      this.watchlistMovie = [];
    }
  }

}