import { Component, OnInit, signal } from '@angular/core';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { SerieDetailsResponse } from '../../models/serie-details.interface';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SerieCast } from '../../models/serie-cast.interface';
import { Keyword } from '../../models/keyword.interface';
import { TrailerResponse } from '../../models/trailer.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})


export class SerieDetailsComponent implements OnInit {


  readonly panelOpenState = signal(false);



  constructor(private route: ActivatedRoute, private serieDetailsService: SeriesService, private favoriteService: FavoritesService) { }


  series: SerieDetailsResponse | undefined;

  cast: SerieCast | undefined;



  fechaSalida: string | undefined;
  name: string | undefined;
  genero: string | undefined;
  descripcion: string | undefined;

  keyWords: Keyword[] = [];

  trailers: string[] = []
  listaCanales: string[] = []

  trailerUrl: any
  logoPhotos: string[] = []

  video: string | undefined;
  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    if (idSerie) {
      this.serieDetailsService.obtenerDetallesSerie(Number(idSerie)).subscribe((data: SerieDetailsResponse) => {
        this.series = data
        this.name = data.name
        this.fechaSalida = data.first_air_date
        this.genero = data.genres[0].name
        this.descripcion = data.overview
        this.listaCanales[0] = data.networks[0].logo_path


        this.serieDetailsService.getKeyWords(Number(idSerie)).subscribe((data: Keyword) => {
          this.keyWords = [data]
        })


      });
      this.getSerieCast(Number(idSerie));


    }
  }



  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  getSerieCast(id: number) {
    this.serieDetailsService.obtenerRepartoSerie(id).subscribe((data: SerieCast) => {
      this.cast = data
    })
  }

  obtenerColorCalificacion(voteAverage: number, index: number): string {
    const level = Math.ceil(voteAverage / 2);
    if (index < level) {
      return '';
    } else {
      return 'brightness(0.2)';
    }
  }


  getPopcornIcons(voteAverage: number): string[] {
    return Array.from({ length: 5 }, (_, index) => this.obtenerColorCalificacion(voteAverage, index));
  }


  getTrailer(id: number): void {
    this.serieDetailsService.getTrailer(id).subscribe((data: TrailerResponse) => {
      if (data.results.length > 0)
        this.trailerUrl = `https://www.youtube.com/watch?v=${data.results[0].key}`;
      window.open(this.trailerUrl, '_blank');
    });
  }

  addSerieToFavourite(): void {
    if (this.series) {
      this.favoriteService.addSeriesToFavourites(this.series.id.toString()).subscribe(() => {

      });
    }
  }

  

}