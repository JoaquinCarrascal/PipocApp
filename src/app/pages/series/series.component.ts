import { Component, Input, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Serie, SerieResponse } from '../../interface/serie.interface';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  
  @Input() valoresFiltroFecha: any[] = [];
  selectedValue: any;
  formGroup: any;
  id : number = 1;
  listaSeries: Serie[] = [];
  
  constructor(private serieService : SeriesService){}

  ngOnInit(): void {
    this.valoresFiltroFecha = [
      { name: 'Ascendente', code: 'ASC' },
      { name: 'Descendente', code: 'DESC' }
    ];

    this.serieService.getSeries().subscribe((data  : SerieResponse) => {
      this.listaSeries = data.results;
    })


  }

}