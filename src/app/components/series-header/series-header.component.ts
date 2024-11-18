import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Serie } from '../../models/serie.interface';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-series-header',
  templateUrl: './series-header.component.html',
  styleUrls: ['./series-header.component.css'],

})
export class SeriesHeaderComponent implements OnInit {
  series: Serie[] = [];
  temporizador: any;

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.cargarSeries();
    this.temporizador = setInterval(() => {
      this.cargarSeries();
    }, 10000);
  }

  cargarSeries() {
    this.seriesService.orderSeriesByRatingRandom('asc').subscribe((series) => {
      this.series = series.results.slice(0, 5);
    });
  }

  
}
