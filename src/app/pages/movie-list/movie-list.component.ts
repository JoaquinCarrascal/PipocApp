import { Component, HostListener, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  
  popularList: TopRatedList[] = [];
  pageCounter: number = 3;
  value: number = 0;
  free: boolean = false;

  constructor(private movieServ: MovieServService,
              private pipeDateForm: DateFormaterPipe,
              private router: Router) { }
  
  ngOnInit(): void {

    this.loadData();

  }

  loadData(): void {

    this.popularList = [];
    this.pageCounter = 3;
    
    for (let i = 1; i <= this.pageCounter; i++) {
      this.movieServ.getMovieList(i , this.free ,this.value).subscribe((data) => {
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

    this.pageCounter++;
    
      this.movieServ.getMovieList(this.pageCounter , this.free ,this.value).subscribe((data) => {
        this.popularList = this.popularList.concat(data.results);
      });
      
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

  navigateToTvShow() {
    this.router.navigate(['/series']);
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
