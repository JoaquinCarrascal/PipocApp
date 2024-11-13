import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  
  @Input() valoresFiltroFecha: any[] = [];
  selectedValue: any;
formGroup: any;

  ngOnInit(): void {
    this.valoresFiltroFecha = [
      { name: 'Ascendente', code: 'ASC' },
      { name: 'Descendente', code: 'DESC' }
    ];
  }

}