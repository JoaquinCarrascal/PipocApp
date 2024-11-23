import { Component, OnInit } from '@angular/core';
import { SeriesAccountService } from '../../services/series-account.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-rated-series',
  templateUrl: './rated-series.component.html',
  styleUrls: ['./rated-series.component.css']
})
export class RatedSeriesComponent implements OnInit {
  ratedSeries: any[] = [];

  constructor(private seriesAcc: SeriesAccountService, private serieService: SeriesService) { }

  ngOnInit(): void {
    this.getSeriesWithRating();
  }

  getSeriesWithRating() {
    this.seriesAcc.getUserRatings().subscribe((data) => {
      this.ratedSeries = data.results;
    });
  }
}