import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { Network, SerieDetails } from '../../models/serie-details.interface';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { SeriesAccountService } from '../../services/series-account.service';
import { SerieCast } from '../../models/serie-cast.interface';
import { Keyword } from '../../models/keyword.interface';
import { TrailerResponse } from '../../models/trailer.interface';
import { AuthService } from '../../services/auth.service';
import { Toast } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';
import { FavoritesService } from '../../services/favorites.service';




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
    private seriesAcc : SeriesAccountService,
    private favoritesService: FavoritesService,
    
  ) { }

  series: SerieDetails | undefined;
  serieDetails: SerieDetails[] = [];
  cast: SerieCast | undefined;

  toast : Toast | undefined;
  nombre = "Nombre no encontrado"

  userRating: number = 0;
  voteCount: number | undefined;
  backdropPath: string = "";
  status: string = "";
  networkList: Network[] = [];

  fechaSalida: string | undefined;
  name: string | undefined;
  genero: string | undefined;
  descripcion: string | undefined;
  lenguage: string = "";

  keyWords: string[] = [];

  trailers: string[] = [];
  listaCanales: string[] = [];

  trailerUrl: any;
  logoPhotos: string[] = [];

  video: string | undefined;
  listadoValoraciones: string[] = [];
  pag: number = 1;

  swapToast: number = 0; //toast = 0 no se borra , toast = 1 se borra , toast = 2 se agrega a fav , 3 se agrega a watchlist
  hasBackDrop : boolean = false;


  toastService = inject(ToastService);
  @ViewChild('successTemplate') successTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    if (idSerie) {
      this.serieDetailsService.obtenerDetallesSerie(Number(idSerie)).subscribe((data: SerieDetails) => {
        this.series = data;

        this.backdropPath = data.backdrop_path;
        this.hasBackDrop = data.backdrop_path != null ? true : false;
        this.name = data.name;
        this.fechaSalida = data.first_air_date;
        this.genero = data.genres[0]?.name || "No se ha encontrado el género"; 
        this.status = data.status || "No se ha encontrado el estado";
        this.networkList = data.networks || ["No se han encontrado canales"];
        this.lenguage = data.original_language || "No se ha encontrado el idioma";

        this.descripcion = data.overview;
        this.listaCanales[0] = data.networks[0]?.logo_path; 
        this.voteCount = data.vote_count;
        this.getPopcornIcons(this.userRating);

        this.serieDetailsService.getKeyWords(Number(idSerie)).subscribe((keywords: Keyword) => {
          if(keywords.results.length > 0)
          this.keyWords = keywords.results.map(keyword => keyword.name);

          else
          this.keyWords = ["No se han encontrado palabras clave"];

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
      this.getPopcornIcons(this.userRating);
      if (idSerie) {
        this.seriesAccountService.addRating(Number(idSerie), rating).subscribe(response => {
          this.showSuccess(this.successTemplate);  
          this.swapToast = 0;
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
      delay: 3000 
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


  valoracionUsuario(page?:number){

    const idSerie = this.route.snapshot.paramMap.get('idSerie');

    this.seriesAccountService.getUserRatings(page).subscribe((data) => {
      const serieRating = data.results.find(result => result.id === Number(idSerie));
      console.log(serieRating);
      console.log(data.results);
      if (serieRating) {
        this.userRating = serieRating.rating;
        this.getPopcornIcons(this.userRating);
        this.pag = 1;
      }else{
        this.valoracionUsuario(this.pag += 1);
      }
    });
  }

  deleteSeriesRating(serieId: number) {
    this.seriesAcc.deleteSerieRating(serieId).subscribe(() => {

    this.listadoValoraciones = Array.from({ length: 10 }, (_, index) => this.obtenerColorCalificacion(0, index , 0.2));
    this.userRating = 0;
    this.showSuccess(this.successTemplate);
    this.swapToast = 1;
    });
  }

  addSerieToFavorite() {

    if (this.series) {
      this.favoritesService.addSeriesToFavourites(this.series.id.toString()).subscribe(() => {
        this.showSuccess(this.successTemplate);
        this.swapToast = 2;
      });
    }

  }

  addSeriesToWatchlist(): void {
    if (this.series) {
      this.serieDetailsService.addSeriesToWatchlist(this.series.id).subscribe(() => {
        this.showSuccess(this.successTemplate);
        this.swapToast = 3;
      });
    }
  }

}
  
    
  
