import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchlistMovieResponse, MovieWatch } from '../../models/watchlist-movie.interface';
import { WatchlistSeriesResponse, SerieWatch } from '../../models/watchlist-series.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: MovieWatch[] = [];
  watchlistSeries: SerieWatch[] = [];

  constructor(private watchlistService: WatchlistService, private authService: AuthService) {}

  ngOnInit(): void {

    const account_id = Number(this.authService.getSessionId());


    this.watchlistService.getWatchlistMovies(account_id).subscribe((data: WatchlistMovieResponse) => {
      this.watchlistMovies = data.results;
    });

    this.watchlistService.getWatchlistSeries(account_id).subscribe((data: WatchlistSeriesResponse) => {
      this.watchlistSeries = data.results;
    });

  }
}
