import { Component, HostListener, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { MyListsService } from '../../services/my-lists.service';
import { MovieSearchList, MovieSearchResponse } from '../../models/movie-search';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  
  popularList: TopRatedList[] | MovieSearchList[] = [];
  pageCounter: number = 3;
  pageCounterSearch: number = 3;
  value: number = 0;
  free: boolean = false;
  searchValue: string = '';
  searchDone: boolean = false;
  max: number = 100;
  min: number = 0;

  constructor(private movieServ: MovieServService,
              private pipeDateForm: DateFormaterPipe,
              private router: Router,
              private myListServ : MyListsService) { }
  
  ngOnInit(): void {

    this.loadData();

  }

  loadData(): void {

    this.popularList = [];
    this.pageCounter = 3;
    
    for (let i = 1; i <= this.pageCounter; i++) {
      this.movieServ.getMovieList(i , this.free ,this.value , this.min , this.max).subscribe((data) => {
        this.popularList = this.popularList.concat(data.results);
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

  concatNextPage(){
    
    if(!this.searchDone){
      this.pageCounter++;
      this.movieServ.getMovieList(this.pageCounter , this.free , this.value , this.min , this.max).subscribe((data) => {
        this.popularList = this.popularList.concat(data.results);
      });
    }else{
      this.pageCounterSearch++;
      this.myListServ.searchMovieItem(this.searchValue , this.pageCounterSearch).subscribe((data : MovieSearchResponse) => {
        this.popularList = this.popularList.concat(data.results);
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

  querySearch() {
    
    if(this.searchValue != ''){
      this.popularList = [];
      this.searchDone = true;
      this.min = 0;
      this.max = 100;
      for (let i = 1; i <= this.pageCounterSearch; i++) {
        this.myListServ.searchMovieItem(this.searchValue , i).subscribe((data) => {
        this.popularList = this.popularList.concat(data.results);
        });
      }
    } else {
      this.searchDone = false;
      this.loadData();
    }
  
  }

  formatLabel(value: number): string {
    
    return `${value}`;
    
  }

  getImageUrl(posterPath: string , width : number){

    return `https://image.tmdb.org/t/p/w${width}/${posterPath}`;
  
  }

  dateFormater(date: string): string{
  
    return this.pipeDateForm.transform(date);
    
  }


}
