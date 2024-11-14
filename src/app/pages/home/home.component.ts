import { Component, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

topRatedList: TopRatedList[] = [];
constructor(private movieServ: MovieServService) { }
  

ngOnInit(): void {
  
  this.movieServ.getTopRated().subscribe((data) => {
    this.topRatedList = data.results;
    this.getTop5();
  });

}

getTop5(){

this.topRatedList = this.topRatedList.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);

}

getImageUrl(posterPath: string){

  return `https://image.tmdb.org/t/p/w200/${posterPath}`;

}


}
