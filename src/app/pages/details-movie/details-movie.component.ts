import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';
import { MovieDetailResponse } from '../../models/movies-details-response';
import { CastResponse, Cast, Crew } from '../../models/movie-cast-response';
import { ProvidersResponse, Flatrate } from '../../models/movies-watch-providers';
import { VideoResponse, Result } from '../../models/movies-video-response';
import { AuthService } from '../../services/auth.service';
import { SeriesAccountService } from '../../services/series-account.service';
import { Toast, ToastService } from '../../services/toast.service';
import { Network } from '../../models/serie-details.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.css'
})
export class DetailsMovieComponent implements OnInit {
  movies: MovieDetailResponse | undefined;
  genres: string[] = [];
  cast: Cast[] = [];
  crew: Crew[] = [];
  productionCompanyLogo: string | null = null;
  providers: Flatrate[] = [];
  trailer: Result | null = null;
  networkList: Network[] = [];
  userRating: number = 0;

  listadoValoraciones: string[] = []; 
  toast : Toast | undefined;
  toastService = inject(ToastService);
  pag: number = 1;

  swapToast: number = 0; //toast = 0 no se borra , toast = 1 se borra , toast = 2 se agrega a fav , 3 se agrega a watchlist

  @ViewChild('successTemplate') successTemplate!: TemplateRef<any>;



  constructor(
    private route: ActivatedRoute,
    private detailsMovieService: DetailsMovieService,
    private authSerive : AuthService,
    private seriesAccountService: SeriesAccountService,
    private seriesAcc : SeriesAccountService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    const idMovie = this.route.snapshot.paramMap.get('idMovie');
    if (idMovie) {
      this.detailsMovieService.getMovieDetails(+idMovie).subscribe((data: MovieDetailResponse) => {
        this.movies = data;
        this.genres = data.genres.map(genre => genre.name);
        this.setProductionCompanyLogo();
        this.getPopcornIcons(this.userRating);
        this.networkList = data.production_companies
          .filter(company => company.logo_path)
          .map(company => ({
            display_priority: company.display_priority,
            logo_path: company.logo_path,
            id: company.provider_id,
            name: company.provider_name,
            origin_country: company.provider_name
          }));
    

      });
      this.getMovieCast(+idMovie);
      this.getMovieProviders(+idMovie);
      this.detailsMovieService.getMovieTrailer(+idMovie).subscribe(data => {
        this.trailer = data.results.find(result => result.type === 'Trailer') || null;
      });

      this.valoracionUsuarioMovie();
    }
  }


  obtenerImagenPelicula(tam: number, path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/original${path}` : 'assets/placeholder.svg';
  }

  setProductionCompanyLogo(): void {
    if (this.movies){
      const company = this.movies.production_companies.find(c => c.provider_name === 'Netflix' || c.provider_name === 'HBO' || c.provider_name === 'Amazon Prime Video');
      this.productionCompanyLogo = company ? this.obtenerImagenPelicula(200, company.logo_path) : null;
    }
  }

  getMovieCast(id: number): void {
    this.detailsMovieService.getMovieCast(id).subscribe((data: CastResponse) => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }


  getMovieProviders(id: number): void {
    this.detailsMovieService.getMovieProviders(id).subscribe((data: ProvidersResponse) => {
      this.providers = data.results.ES?.flatrate || [];
    });
  }

  irAPlataforma(link: string): void {
    window.open(link, '_blank');
  }

  obtenerColorCalificacion(userRating: number, index: number , brightness: number): string {
    if (index < userRating) {
      return '';
    } else {
      return `brightness(${brightness})`;
    }
  }

  getPopcornIcons(userRating: number) {
    this.listadoValoraciones = Array.from({ length: 10 }, (_, index) => this.obtenerColorCalificacion(userRating, index , 0.2));
  }
  getDirectors(): Crew[] {
    return this.crew.filter(member => member.known_for_department === 'Directing');
  }

  verTrailer(): void {
    if (this.trailer) {
      window.open(`https://www.youtube.com/watch?v=${this.trailer.key}`, '_blank');
    }
  }

  addFilmToFavourites(): void {
    if (this.movies) {
      this.favoritesService.addFilmToFavourites(this.movies.id.toString()).subscribe(() => {
        this.showSuccess(this.successTemplate);
        this.swapToast = 2;
      });
    }
  }

  addFilmToWatchlist(): void {
    if (this.movies) {
      this.detailsMovieService.addFilmToWatchlist(this.movies).subscribe(() => {
        this.showSuccess(this.successTemplate);
        this.swapToast = 3;
      });
    }
  }

  comprobarInicioSesion(): boolean {
    return this.authSerive.checkUserIsLogged();
  }

  rateMovie(rating: number): void {
    const idMovie = this.route.snapshot.paramMap.get('idMovie');
    if (this.comprobarInicioSesion()) {
      this.userRating = rating;
      this.getPopcornIcons(this.userRating);
      if (idMovie) {
        this.seriesAccountService.addMovieRating(Number(idMovie), rating).subscribe(response => {
          this.showSuccess(this.successTemplate);
          this.swapToast = 0;
        });
      }
    } else {
      this.noLoggedAlert();
    }
  }

  noLoggedAlert() {
    alert('Debe iniciar sesión para poder valorar la serie');
  }

  valoracionUsuarioMovie(page?:number){

    const idSerie = this.route.snapshot.paramMap.get('idMovie');

    this.seriesAccountService.getUserMoviesRatings(page).subscribe((data) => {
      const serieRating = data.results.find(result => result.id === Number(idSerie));
      if (serieRating) {
        this.userRating = serieRating.rating;
        this.getPopcornIcons(this.userRating);
        this.pag = 1;
      }else{
        this.valoracionUsuarioMovie(this.pag += 1);
      }

    });
  }
  deleteMovieRating(movieId: number) {
    this.seriesAcc.deleteMovieRating(movieId).subscribe(() => {
      this.listadoValoraciones = Array.from({ length: 10 }, (_, index) => this.obtenerColorCalificacion(0, index , 0.2));
      this.userRating = 0;
      this.showSuccess(this.successTemplate);
      this.swapToast = 1;
    });
  }
    
  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ 
      template : template, 
      classname: 'bg-success text-light', 
      delay: 3000 
    });
  }

  
  ngOnDestroy(): void {
		this.toastService.clear();
	}
}
