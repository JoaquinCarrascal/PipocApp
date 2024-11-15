import { Component, Input, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie, SerieResponse } from '../../interface/serie.interface';
import { Root } from '../../interface/serie-by-date.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  
  @Input() valoresFiltroFecha: any[] = [];
  @Input()selectedValue: any;
  formGroup: any;
  id : number = 1;
  listaSeries: Serie[] = [];
  
  constructor(private serieService: SeriesService) {}

  ngOnInit(): void {
    
    this.valoresFiltroFecha = [
      { name: 'Series Populares' ,code : 'DEF' },
      { name: 'Series Recientes', code: 'ASC' },
      {name : 'Series Antiguas' , code : 'LAST'},
      { name: 'Top Rated', code: 'TOP' },
     
      
    ];

    this.getSeries()
  }


  getSeries(){
    this.serieService.getSeries().subscribe((data: SerieResponse) => {
      this.listaSeries = data.results;
    });
  }


  obtenerImagenSerie(tam: number, path: string) {
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }


orderMethod(){

  if(this.selectedValue.name === 'Top Rated'){
    this.serieService.orderSeriesByRating('top').subscribe((data: SerieResponse) => {
      this.listaSeries = data.results;
      console.log(this.listaSeries);
    });
  }

  if (this.selectedValue.name === 'Series Recientes') {
    this.serieService.orderSeriesByDate('asc').subscribe((data: SerieResponse) => {
        this.listaSeries = data.results;
   
    });
}

    if(this.selectedValue.name === 'Series Populares'){
      this.getSeries();
    }

  if(this.selectedValue.name === 'Series Antiguas'){
    this.serieService.ordenarPorprimerasSeries('last').subscribe((data: SerieResponse) => {
      this.listaSeries = data.results;
    });
  }
}
  

doFilter() {
  const selectElement = document.getElementById('ordenSalida') as HTMLSelectElement;
  this.selectedValue = { name: selectElement.value };
  this.orderMethod();
}
}
