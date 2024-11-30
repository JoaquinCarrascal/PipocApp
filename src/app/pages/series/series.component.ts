import { Component, HostListener, Input, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie, SerieResponse } from '../../models/serie.interface';
import { Root } from '../../models/serie-by-date.interface';
import { MyListsService } from '../../services/my-lists.service';
import { TvSearchResponse } from '../../models/tv-search';

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
  searchDone: boolean = false;
  free: boolean = false;
  value: number = 0;
  pageCounterSearch: number = 3;
  lang = localStorage.getItem('lang') || 'es-ES';

  constructor(private serieService: SeriesService,
              private myListServ: MyListsService
          ) {}

  ngOnInit(): void {

    this.loadData();
    
  }


  loadData(){

    this.listaSeries = [];
    this.pageCounter = 3;

    for(let i = 1; i <= this.pageCounter; i++){
      this.serieService.getSeries(i , this.free ,this.value , this.min , this.max).subscribe((data: SerieResponse) => {

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
    if(this.searchValue != ''){
      this.listaSeries = [];
      this.searchDone = true;
      this.min = 0;
      this.max = 100;
      for (let i = 1; i <= this.pageCounterSearch; i++) {
        this.myListServ.searchTvItem(this.searchValue , i).subscribe((data) => {
        
        this.listaSeries = this.listaSeries.concat(data.results.map(result => ({
          ...result,
          poster_path: result.poster_path || ''
        })));
        });
      }
    } else {
      this.searchDone = false;
      this.loadData();
    }
  }

  concatNextPage(){

    if(!this.searchDone){
      this.pageCounter++;
      this.serieService.getSeries(this.pageCounter , this.free , this.value , this.min , this.max).subscribe((data) => {
        this.listaSeries = this.listaSeries.concat(data.results);
      });
    }else{
      this.pageCounterSearch++;
      this.myListServ.searchTvItem(this.searchValue , this.pageCounterSearch).subscribe((data : TvSearchResponse) => {
        this.listaSeries = this.listaSeries.concat(data.results.map(result => ({
          ...result,
          poster_path: result.poster_path || ''
        })));
      });

    }

  }

  onSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value = Number(selectElement.value);
    this.loadData();
  }

  swapFree() {
    this.free = !this.free;
    this.loadData();
  }

  getImageUrl(path: string,tam: number) {
    return `https://image.tmdb.org/t/p/w${tam}/${path}`;
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }

formatLabel(value: number): string {
    
  return `${value}`;
  
}

//https://www.themoviedb.org/video/play?key=${key}


}
