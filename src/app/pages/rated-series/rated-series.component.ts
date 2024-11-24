import { Component, OnInit } from '@angular/core';
import { SeriesAccountService } from '../../services/series-account.service';
import { SeriesService } from '../../services/series.service';

import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

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

  obtenerImagenOriginal(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }
  
}