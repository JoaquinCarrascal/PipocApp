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

  userRating: number = 0;


  toast : Toast | undefined;
  toastService = inject(ToastService);
  @ViewChild('successTemplate') successTemplate!: TemplateRef<any>;


  constructor(
    private route: ActivatedRoute,
    private detailsMovieService: DetailsMovieService,
    private authSerive : AuthService,
    private seriesAccountService: SeriesAccountService
  ) { }

  ngOnInit(): void {
    const idMovie = this.route.snapshot.paramMap.get('idMovie');
    if (idMovie) {
      this.detailsMovieService.getMovieDetails(+idMovie).subscribe((data: MovieDetailResponse) => {
        this.movies = data;
        this.genres = data.genres.map(genre => genre.name);
        this.setProductionCompanyLogo();
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

  obtenerColorCalificacion(userRating: number, index: number): string {
    if (index < userRating) {
      return '';
    } else {
      return 'brightness(0.2)';
    }
  }

  getPopcornIcons(userRating: number): string[] {
    return Array.from({ length: 10 }, (_, index) => this.obtenerColorCalificacion(userRating, index));
  }
  getDirectors(): Crew[] {
    return this.crew.filter(member => member.known_for_department === 'Directing');
  }

  verTrailer(): void {
    if (this.trailer) {
        window.open(`https://www.youtube.com/watch?v=${this.trailer.key}`, '_blank');
    }
  }

  comprobarInicioSesion(): boolean {
    return this.authSerive.checkUserIsLogged();
  }

  rateMovie(rating: number): void {
    const idMovie = this.route.snapshot.paramMap.get('idMovie');
    if (this.comprobarInicioSesion()) {
      this.userRating = rating;
      if (idMovie) {
        this.seriesAccountService.addMovieRating(Number(idMovie), rating).subscribe(response => {
          this.showSuccess(this.successTemplate); 
        });
      }
    } else {
      this.noLoggedAlert();
    }
  }

  noLoggedAlert() {
    alert('Debe iniciar sesión para poder valorar la serie');
  }

  valoracionUsuarioMovie(){

    const idSerie = this.route.snapshot.paramMap.get('idMovie');

    this.seriesAccountService.getUserMoviesRatings().subscribe((data) => {
      const serieRating = data.results.find(result => result.id === Number(idSerie));
      if (serieRating) {
        this.userRating = serieRating.rating;
      }
    });
  }

    
  showSuccess(template: TemplateRef<any>) {
    this.toastService.show({ 
      template : template, 
      classname: 'bg-success text-light', 
      delay: 7000 
    });
  }

  
  ngOnDestroy(): void {
		this.toastService.clear();
	}
}
