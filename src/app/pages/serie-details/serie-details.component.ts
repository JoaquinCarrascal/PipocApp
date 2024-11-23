import { Component, Input, OnInit } from '@angular/core';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { SerieDetails } from '../../models/serie-details.interface';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SeriesAccountService } from '../../services/series-account.service';
import { SerieCast } from '../../models/serie-cast.interface';
import { Keyword } from '../../models/keyword.interface';
import { TrailerResponse } from '../../models/trailer.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrls: ['./serie-details.component.css'] // Cambiado a styleUrls
})
export class SerieDetailsComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private serieDetailsService: SeriesService,
    private seriesAccountService: SeriesAccountService,
    private authSerive : AuthService
  ) { }

  series: SerieDetails[] = [];
  serieDetails: SerieDetails[] = [];
  cast: SerieCast | undefined;

  userRating: number = 0;
  voteCount: number | undefined;

  fechaSalida: string | undefined;
  name: string | undefined;
  genero: string | undefined;
  descripcion: string | undefined;

  keyWords: Keyword[] = [];

  trailers: string[] = [];
  listaCanales: string[] = [];

  trailerUrl: any;
  logoPhotos: string[] = [];

  video: string | undefined;

  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    if (idSerie) {
      this.serieDetailsService.obtenerDetallesSerie(Number(idSerie)).subscribe((data: SerieDetails) => {
        this.series = [data];
        this.name = data.name;
        this.fechaSalida = data.first_air_date;
        this.genero = data.genres[0]?.name; 
        this.descripcion = data.overview;
        this.listaCanales[0] = data.networks[0]?.logo_path; 
        this.voteCount = data.vote_count;

        this.serieDetailsService.getKeyWords(Number(idSerie)).subscribe((keywords: Keyword) => {
          this.keyWords = [keywords];
        });

        // Recuperar el rating almacenado en localStorage
        const storedRating = localStorage.getItem(`userRating_${idSerie}`);
        if (storedRating) {
          this.userRating = parseInt(storedRating, 10);
        }
      });

      this.getSerieCast(Number(idSerie));
    }
  }

  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  getSerieCast(id: number): void {
    this.serieDetailsService.obtenerRepartoSerie(id).subscribe((data: SerieCast) => {
      this.cast = data;
    });
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

  getTrailer(id: number): void {
    this.serieDetailsService.getTrailer(id).subscribe((data: TrailerResponse) => {
      if (data.results.length > 0) {
        this.trailerUrl = `https://www.youtube.com/watch?v=${data.results[0].key}`;
        window.open(this.trailerUrl, '_blank');
      }
    });
  }

  rateSeries(rating: number): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (this.comprobarInicioSesion()) {
      this.userRating = rating;
      if (idSerie) {
        localStorage.setItem(`userRating_${idSerie}`, rating.toString());
        this.seriesAccountService.addRating(Number(idSerie), rating).subscribe(response => {
          
        });
      }
    } else {
      this.noLoggedAlert();
    }
  }

  comprobarInicioSesion(): boolean {
    return this.authSerive.checkUserIsLogged();
  }

  noLoggedAlert() {
    alert('Debe iniciar sesión para poder valorar la serie');
  }
}