import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavMovieResponse, FavoriteMovies } from '../../models/fav-movie-response';
import { FavoriteTv } from '../../models/fav-tv-response';
import { MovieDetailResponse } from '../../models/movies-details-response';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css'
})
export class FavListComponent implements OnInit {

  favoriteMovies: FavoriteMovies[] = [];
  favoriteSeries: FavoriteTv[] = [];
  currentPage: number = 1;
  totalPages: number | undefined;
  lang = localStorage.getItem('lang') || 'es-ES';

  constructor(private favService: FavoritesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.favService.getFavoriteFilms(this.currentPage.toString()).subscribe((response) => {
      this.favoriteMovies = response.results;
      this.totalPages = response.total_pages;
    });
  }

  loadSeries(): void {
    this.favService.getFavoriteSeries(this.currentPage.toString()).subscribe((response) => {
      this.favoriteSeries = response.results;
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
      this.favoriteSeries = [];
    } else {
      this.loadSeries();
      this.favoriteMovies = [];
    }
  }

  removeMoviesFromFavorite(movieId: number): void {
    this.favService.removeMoviesFromFavorite(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((favoriteMovies) => favoriteMovies.id !== movieId);
    });
  }

  removeSeriesFromFavorite(seriesId: number): void {
    this.favService.removeSeriesFromFavorite(seriesId).subscribe(() => {
      this.favoriteSeries = this.favoriteSeries.filter((favoriteSeries) => favoriteSeries.id !== seriesId);
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    if (this.favoriteMovies.length > 0) {
      this.loadMovies();
    } else {
      this.loadSeries();
    }
  }

}