import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ListadoPopularPeople, PopularPeopleResponse } from '../../models/popular-people-response';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent implements OnInit {

  listaPeople: ListadoPopularPeople[] = [];

  constructor(private peopleService : PeopleService) { }

  ngOnInit(): void {
    this.peopleService.getPopularPeople().subscribe((data : PopularPeopleResponse) => {
      this.listaPeople = data.results;
    });
  }

}
