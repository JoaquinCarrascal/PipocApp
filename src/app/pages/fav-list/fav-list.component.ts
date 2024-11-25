import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavMovieResponse } from '../../models/fav-movie-response';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css'
})
export class FavListComponent implements OnInit {

  favoriteMovies : FavMovieResponse[] = [];

  constructor(private favService : FavoritesService) {}
  
  ngOnInit() {
  }

  getFavoriteMovies() {
    this.favService.getFavoriteMovies().subscribe(
      (data) => {
        console.log(data);
      }
    );
  }



}
