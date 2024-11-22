import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsMovieService } from '../../services/details-movie.service';
import { MovieDetailResponse } from '../../models/movies-details-response';
import { CastResponse, Cast, Crew } from '../../models/movie-cast-response';
import { ProvidersResponse, Flatrate } from '../../models/movies-watch-providers';
import { VideoResponse, Result } from '../../models/movies-video-response';

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

  constructor(
    private route: ActivatedRoute,
    private detailsMovieService: DetailsMovieService
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

  obtenerColorCalificacion(voteAverage: number, index: number): string {
    const level = Math.ceil(voteAverage / 2);
    if (index < level) {
      return ''; // Green for high ratings
    } else {
      return 'brightness(0.2)'; // Darker color for unachieved levels
    }
  }

  getPopcornIcons(voteAverage: number): string[] {
    return Array.from({ length: 5 }, (_, index) => this.obtenerColorCalificacion(voteAverage, index));
  }

  getDirectors(): Crew[] {
    return this.crew.filter(member => member.known_for_department === 'Directing');
  }

  verTrailer(): void {
    if (this.trailer) {
        window.open(`https://www.youtube.com/watch?v=${this.trailer.key}`, '_blank');
    }
  }

  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

}
