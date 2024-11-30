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
  currentPage: number = 1;
  totalPages: number | undefined;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.watchlistService.getWatchlistMovies(this.currentPage.toString()).subscribe((response) => {
      this.watchlistMovie = response.results;
      this.totalPages = response.total_pages;
    });
  }

  loadSeries(): void {
    this.watchlistService.getWatchlistSeries(this.currentPage.toString()).subscribe((response) => {
      this.watchlistSeries = response.results;
      this.totalPages = response.total_pages;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

  clickMovieSerie(isMovie: boolean): void {
    this.currentPage = 1;
    if (isMovie) {
      this.loadMovies();
      this.watchlistSeries = [];
    } else {
      this.loadSeries();
      this.watchlistMovie = [];
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    if (this.watchlistMovie.length > 0) {
      this.loadMovies();
    } else {
      this.loadSeries();
    }
  }

  removeMoviesFromWatchlist(movieId: number): void {
    this.watchlistService.removeMoviesFromWatchlist(movieId).subscribe(() => {
      this.watchlistMovie = this.watchlistMovie.filter((watchlistMovie) => watchlistMovie.id !== movieId);
    });
  }

  removeSeriesFromWatchlist(seriesId: number): void {
    this.watchlistService.removeSeriesFromWatchlist(seriesId).subscribe(() => {
      this.watchlistSeries = this.watchlistSeries.filter((watchlistSeries) => watchlistSeries.id !== seriesId);
    });
  }

}