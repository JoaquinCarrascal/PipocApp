import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavMovieResponse, FavoriteMovies } from '../../models/fav-movie-response';
import { MovieDetailResponse } from '../../models/movies-details-response';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css'
})
export class FavListComponent implements OnInit {

  favoriteMovies : FavoriteMovies[] = [];
  


  constructor(private favService : FavoritesService) {}
  
  ngOnInit(): void {
    this.favService.getFavoriteFilms().subscribe((response) => {
      this.favoriteMovies = response.results;
    });
  }

  getFullImagePath(posterPath: string): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${posterPath}`;
    }

  removeFromFavorites(movieId: number): void {
    this.favService.removeFilmFromFavourites(movieId).subscribe(() => {
      this.favoriteMovies = this.favoriteMovies.filter((favMovie) => favMovie.id !== movieId);
    });
  }


}