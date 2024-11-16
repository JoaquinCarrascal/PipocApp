import { Component, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit {
  
  popularList: TopRatedList[] = [];

  constructor(private movieServ: MovieServService) { }
  
  ngOnInit(): void {

    this.movieServ.getMovieList(1).subscribe((data) => {
      this.popularList = data.results;
    });
    this.movieServ.getMovieList(2).subscribe((data) => {
      this.popularList = this.popularList.concat(...data.results);
    });
    this.movieServ.getMovieList(3).subscribe((data) => {
      this.popularList = this.popularList.concat(...data.results);
    });

  }

  formatLabel(value: number): string {
    
    return `${value}`;
    
  }

  getImageUrl(posterPath: string , width : number){

    return `https://image.tmdb.org/t/p/w${width}/${posterPath}`;
  
  }



}
