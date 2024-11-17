import { Component, HostListener, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  
  popularList: TopRatedList[] = [];
  pageCounter: number = 3;

  constructor(private movieServ: MovieServService , private pipeDateForm: DateFormaterPipe) { }
  
  ngOnInit(): void {

    this.pageCounter = 3;
    for (let i = 1; i <= this.pageCounter; i++) {
      this.movieServ.getMovieList(i).subscribe((data) => {
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
    this.movieServ.getMovieList(this.pageCounter).subscribe((data) => {
      this.popularList = this.popularList.concat(data.results);
    });

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
