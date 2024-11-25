import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watchlist.service';
import { WatchlistMovieResponse, MovieResult } from '../../models/watchlist-movie.interface';
import { WatchlistSeriesResponse, SerieResult } from '../../models/watchlist-series.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlistMovies: MovieResult[] = [];
  watchlistSeries: SerieResult[] = [];
  loadingMovies: boolean = true;
  loadingSeries: boolean = true;
  errorMessage: string = '';

  constructor(private watchlistService: WatchlistService, private authService: AuthService) {}

  ngOnInit(): void {
    const session_id = this.authService.getSessionId();
    console.log('Session ID:', session_id); // Verificar si el session_id se está obteniendo correctamente

    if (session_id) {
      this.watchlistService.getAccountDetails().subscribe({
        next: (accountDetails) => {
          const account_id = accountDetails.id;

          // Cargar películas
          this.watchlistService.getWatchlistMovies(account_id).subscribe({
            next: (data: WatchlistMovieResponse) => {
              this.watchlistMovies = data.results;
              this.loadingMovies = false;
              console.log('Movies:', this.watchlistMovies); // Verificar si los datos se están obteniendo
            },
            error: (err) => {
              console.error('Error al cargar películas:', err);
              this.loadingMovies = false;
              this.errorMessage = 'Error al cargar películas.';
            }
          });

          // Cargar series
          this.watchlistService.getWatchlistSeries(account_id).subscribe({
            next: (data: WatchlistSeriesResponse) => {
              this.watchlistSeries = data.results;
              this.loadingSeries = false;
              console.log('Series:', this.watchlistSeries); // Verificar si los datos se están obteniendo
            },
            error: (err) => {
              console.error('Error al cargar series:', err);
              this.loadingSeries = false;
              this.errorMessage = 'Error al cargar series.';
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener detalles de cuenta:', err);
          this.errorMessage = 'No se pudo obtener los detalles de la cuenta. Intenta de nuevo más tarde.';
        }
      });
    } else {
      console.error('No session_id found. Please authenticate first.');
      this.errorMessage = 'Por favor, inicia sesión primero.';
    }
  }
}