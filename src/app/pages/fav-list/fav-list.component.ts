import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavMovieResponse, FavoriteMovies } from '../../models/fav-movie-response';
<<<<<<< HEAD
import { FavoriteTv } from '../../models/fav-tv-response';
=======
import { MovieDetailResponse } from '../../models/movies-details-response';
>>>>>>> 251443de1c3427fdc559b8d17af8616da428d7ab

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css'
})
export class FavListComponent implements OnInit {

  favoriteMovies: FavoriteMovies[] = [];
  favoriteSeries: FavoriteTv[] = [];


  constructor(private favService: FavoritesService) { }

  ngOnInit(): void {
    this.favService.getFavoriteFilms().subscribe((response) => {
      this.favoriteMovies = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
  }

<<<<<<< HEAD
  clickMovieSerie(isMovie: boolean): void {
    if (isMovie) {
      this.favService.getFavoriteFilms().subscribe((response) => {
        this.favoriteMovies = response.results;
      });
      this.favoriteSeries = [];
    } else {
      this.favService.getFavoriteSeries().subscribe((response) => {
        this.favoriteSeries = response.results;
      });
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
=======
  removeFromFavorites(movieId: number): void {
    this.favService.removeFilmFromFavourites(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((favMovie) => favMovie.id !== movieId);
    });
  }

>>>>>>> 251443de1c3427fdc559b8d17af8616da428d7ab

}