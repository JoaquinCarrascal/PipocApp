import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { Root } from '../../models/serie-by-date.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  
  @Input() valoresFiltroFecha: any[] = [];
  @Input()selectedValue: any;
  formGroup: any;
  pageCounter: number = 3;
  id : number = 1;
  listaSeries: Serie[] = [];
  listaSeriesHeader: Serie[] = [];
  
  constructor(private serieService: SeriesService) {}

  

  ngOnInit(): void {

    this.pageCounter = 3;
    
    this.valoresFiltroFecha = [
      { name: 'Series Populares' ,code : 'DEF' },
      { name: 'Series Recientes', code: 'ASC' },
      {name : 'Series Antiguas' , code : 'LAST'},
      { name: 'Top Rated', code: 'TOP' },
     
      
    ];

    for(let i = 1; i <= 3; i++){
      this.getSeries(i);
    }
    
  }


  getSeries(pag: number){
    this.serieService.getSeries(pag).subscribe((data: SerieResponse) => {

      this.listaSeries = this.listaSeries.concat(...data.results);

    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ( ( document.documentElement.clientHeight + window.scrollY ) 
          >= document.documentElement.scrollHeight - 180) {
  
      this.concatNextPage();

    }
  }

  concatNextPage(){

    this.pageCounter++;
    this.getSeries(this.pageCounter);

  }


  obtenerImagenSerie(tam: number, path: string) {
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }


orderMethod(){

  this.listaSeries = [];

  if(this.selectedValue.name === 'Top Rated'){

    for(let i = 1; i <= 3; i++){
      this.serieService.orderSeriesByRating('top' , i).subscribe((data: SerieResponse) => {
        this.listaSeries = this.listaSeries.concat(...data.results);
      });
    }
  }

  if (this.selectedValue.name === 'Series Recientes') {
    for(let i = 1; i <= 3; i++){
      this.serieService.orderSeriesByDate('asc' , i).subscribe((data: SerieResponse) => {

        this.listaSeries = this.listaSeries.concat(...data.results);
   
    });
    }
    
}

    if(this.selectedValue.name === 'Series Populares'){
      this.ngOnInit();
    }

  if(this.selectedValue.name === 'Series Antiguas'){
    for(let i = 1; i <= 3; i++){
      this.serieService.ordenarPorprimerasSeries('last' , i).subscribe((data: SerieResponse) => {
        this.listaSeries = this.listaSeries.concat(...data.results);
      });
    }
  }
}
  

doFilter() {
  const selectElement = document.getElementById('mySelect') as HTMLSelectElement;
  this.selectedValue = { name: selectElement.value };
  this.orderMethod();
  
}

formatLabel(value: number): string {
    
  return `${value}`;
  
}

//https://www.themoviedb.org/video/play?key=${key}


}
