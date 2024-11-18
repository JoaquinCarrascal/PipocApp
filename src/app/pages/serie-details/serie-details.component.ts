import { Component, OnInit } from '@angular/core';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { SerieDetails } from '../../models/serie-details.interface';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SerieCast } from '../../models/serie-cast.interface';
import { Keyword } from '../../models/keyword.interface';
import { TrailerResponse } from '../../models/trailer.interface';

@Component({
  selector: 'app-serie-details',
  templateUrl: './serie-details.component.html',
  styleUrl: './serie-details.component.css'
})
export class SerieDetailsComponent implements OnInit {


  constructor( private route: ActivatedRoute,private serieDetailsService : SeriesService) { }

  
  series : SerieDetails[] = [];
  serieDetails : SerieDetails[] = [];
  cast : SerieCast | undefined;

  fechaSalida : string | undefined;
  name : string | undefined;
  genero :  string | undefined;
  descripcion : string | undefined;
  
  keyWords : Keyword[] = [];

  trailers : string[] = []
  listaCanales : string[] = []

  trailer!: TrailerResponse;
  logoPhotos : string[] = []

  video : string | undefined;
  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    if(idSerie){
      this.serieDetailsService.obtenerDetallesSerie(Number(idSerie)).subscribe((data: SerieDetails) => {
        this.series = [data]
        this.name = data.name
        this.fechaSalida = data.first_air_date
        this.genero = data.genres[0].name
        this.descripcion = data.overview
        this.listaCanales [0] = data.networks[0].logo_path


        this.serieDetailsService.getKeyWords(Number(idSerie)).subscribe((data: Keyword) => {
          this.keyWords = [data]
        })


      });
      this.getSerieCast(Number(idSerie));

      
    }
  }



  obtenerImagenSerie(tam: number, path: string) {
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  getSerieCast(id: number){
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


  getTrailers(key : string){
    return this.serieDetailsService.getTrailers(key).subscribe((data) => {

    })
  }

  
    
  }