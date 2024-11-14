import { Component, OnInit } from '@angular/core';
import { MovieServService } from '../../services/movie-serv.service';
import { TopRatedList } from '../../models/top-rated-response';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

topRatedList: TopRatedList[] = [];
constructor(private movieServ: MovieServService , private pipeDateForm: DateFormaterPipe) { }
  

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

dateFormater(date: string): string{
  
  return this.pipeDateForm.transform(date);
  
}

punctFormater(num: number): number{

  return num * 10;

}


}
