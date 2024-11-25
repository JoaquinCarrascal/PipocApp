import { Component, OnInit } from '@angular/core';
import { SeriesAccountService } from '../../services/series-account.service';
import { SeriesService } from '../../services/series.service';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { RatedSerieResponse } from '../../models/rated-serie.interface';

@Component({
  selector: 'app-rated-series',
  templateUrl: './rated-series.component.html',
  styleUrls: ['./rated-series.component.css']
})
export class RatedSeriesComponent implements OnInit {
  ratedSeries: RatedSerieResponse[] = [];

  constructor(private seriesAcc: SeriesAccountService, private serieService: SeriesService,private pipeDateForm: DateFormaterPipe) { }

  ngOnInit(): void {
    this.getSeriesWithRating();
  }

  getSeriesWithRating() {
    this.seriesAcc.getUserRatings().subscribe((data : RatedSerieResponse) => {
      this.ratedSeries = data.results.map(result => ({
        page: data.page,
        results: [result],
        total_pages: data.total_pages,
        total_results: data.total_results
      }));
    });
  }

  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  
punctFormater(num: number): number{

  return num * 10;

}
dateFormater(date: string): string{
  
  return this.pipeDateForm.transform(date);
  
}
  
  
}