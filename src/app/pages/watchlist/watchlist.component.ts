import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchlistMovieResponse } from '../../models/watchlist-movie.interface';
import { WatchlistSeriesResponse } from '../../models/watchlist-series.interface';
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: WatchlistMovieResponse[] = [];
  watchlistSeries: WatchlistSeriesResponse[] = [];

  constructor(private watchlistService: WatchlistService, private authService: AuthService) {} // Inyecta el servicio de autenticación

  ngOnInit(): void {
    //COGER EL SESSION ACCOUNT ID EN VEZ DE COGER EL ID

    this.watchlistService.getWatchlistMovies(accountId).subscribe((response: WatchlistMovieResponse) => {
      this.watchlistMovies = response.results;
    });

    this.watchlistService.getWatchlistSeries(accountId).subscribe((response: WatchlistSeriesResponse) => {
      this.watchlistSeries = response.results;
    });
  }
}
