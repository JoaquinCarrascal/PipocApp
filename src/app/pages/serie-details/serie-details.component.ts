import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { SerieDetails } from '../../models/serie-details.interface';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SeriesAccountService } from '../../services/series-account.service';
import { SerieCast } from '../../models/serie-cast.interface';
import { Keyword } from '../../models/keyword.interface';
import { TrailerResponse } from '../../models/trailer.interface';
import { AuthService } from '../../services/auth.service';
import { Toast } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';




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
    private authSerive : AuthService,

  ) { }

  series: SerieDetails[] = [];
  serieDetails: SerieDetails[] = [];
  cast: SerieCast | undefined;

  toast : Toast | undefined;


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




  toastService = inject(ToastService);
  @ViewChild('successTemplate') successTemplate!: TemplateRef<any>;

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

        
        this.valoracionUsuario()

         
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

  rateSeries(rating: number) {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');
    if (this.comprobarInicioSesion()) {
      this.userRating = rating;
      if (idSerie) {
        this.seriesAccountService.addRating(Number(idSerie), rating).subscribe(response => {
          this.showSuccess(this.successTemplate);  // Aquí mostramos el toast
        });
      }
    } else {
      this.noLoggedAlert();
    }
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

  comprobarInicioSesion(): boolean {
    return this.authSerive.checkUserIsLogged();
  }

  noLoggedAlert() {
    alert('Debe iniciar sesión para poder valorar la serie');
  }


  valoracionUsuario(){

    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    this.seriesAccountService.getUserRatings().subscribe((data) => {
      const serieRating = data.results.find(result => result.id === Number(idSerie));
      if (serieRating) {
        this.userRating = serieRating.rating;
      }
    });
  }

 

}