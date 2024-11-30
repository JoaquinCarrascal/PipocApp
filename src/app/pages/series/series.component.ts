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
  min: number = 0;
  max: number = 100;
  searchValue: string = '';
  lang = localStorage.getItem('lang') || 'es-ES';

  constructor(private serieService: SeriesService) {}

  ngOnInit(): void {

    this.pageCounter = 3;
    this.loadData();
    
  }


  loadData(){
    this.listaSeries = [];
    for(let i = 1; i <= this.pageCounter; i++){
      this.serieService.getSeries(i).subscribe((data: SerieResponse) => {

        this.listaSeries = this.listaSeries.concat(...data.results);

      });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ( ( document.documentElement.clientHeight + window.scrollY ) 
          >= document.documentElement.scrollHeight - 180) {
  
      this.concatNextPage();

    }
  }
  
  querySearch() {
  throw new Error('Method not implemented.');
  }
  
  swapFree() {
  throw new Error('Method not implemented.');
  }

  concatNextPage(){

    this.pageCounter++;
    this.serieService.getSeries(this.pageCounter).subscribe((data: SerieResponse) => {

      this.listaSeries = this.listaSeries.concat(...data.results);

    });

  }

  getImageUrl(path: string,tam: number) {
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }
  
  onSelectChange($event: Event) {
    throw new Error('Method not implemented.');
  }


formatLabel(value: number): string {
    
  return `${value}`;
  
}

//https://www.themoviedb.org/video/play?key=${key}


}
