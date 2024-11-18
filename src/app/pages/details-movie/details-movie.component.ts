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
  movies: MovieDetailResponse[] = [];
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
        this.movies = [data];
        this.setProductionCompanyLogo();
      });
      this.getMovieCast(+idMovie);
      this.getMovieProviders(+idMovie);
      this.getMovieTrailer(+idMovie);
    }
  }

  obtenerImagenPelicula(tam: number, path: string | null): string {
    return path ? `https://image.tmdb.org/t/p/w${tam}${path}` : 'assets/placeholder.svg';
  }

  setProductionCompanyLogo(): void {
    const company = this.movies[0].production_companies.find(c => c.provider_name === 'Netflix' || c.provider_name === 'HBO' || c.provider_name === 'Amazon Prime Video');
    this.productionCompanyLogo = company ? this.obtenerImagenPelicula(200, company.logo_path) : null;
  }

  obtenerIconoGenero(genreName: string): string {
    switch (genreName.toLowerCase()) {
      case 'action':
        return 'https://fonts.gstatic.com/icon/font?kit=kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsKTAp4vcXjgvg&skey=b8dc2088854b122f&v=v219';
      case 'adventure':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/explore/v15/24px.svg';
      case 'animation':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/movie/v20/24px.svg';
      case 'comedy':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/tag_faces/v21/24px.svg';
      case 'crime':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/gavel/v25/24px.svg';
      case 'documentary':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/emoji_objects/v26/24px.svg';
      case 'drama':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/theater_comedy/v24/24px.svg';
      case 'family':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/family_restroom/v24/24px.svg';
      case 'fantasy':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/auto_awesome/v23/24px.svg';
      case 'history':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/history/v26/24px.svg';
      case 'horror':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/ghost/v18/24px.svg';
      case 'music':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/music_note/v25/24px.svg';
      case 'mystery':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/help_center/v22/24px.svg';
      case 'romance':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/favorite/v26/24px.svg';
      case 'science fiction':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/science/v23/24px.svg';
      case 'tv movie':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/tv/v27/24px.svg';
      case 'thriller':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/warning/v26/24px.svg';
      case 'war':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/military_tech/v26/24px.svg';
      case 'western':
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/local_florist/v24/24px.svg';
      default:
        return 'https://fonts.gstatic.com/s/i/materialiconsoutlined/help_outline/v27/24px.svg';
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

  getMovieTrailer(id: number): void {
    this.detailsMovieService.getMovieTrailer(id).subscribe((data: VideoResponse) => {
      this.trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube') || null;
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

}
