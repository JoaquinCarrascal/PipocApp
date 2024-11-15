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
  filteredPeople: ListadoPopularPeople[] = [];
  currentPage: number = 1;

  constructor(private peopleService : PeopleService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPopularPeople(this.currentPage).subscribe((data : PopularPeopleResponse) => {
      this.listaPeople = data.results;
      this.filteredPeople = this.listaPeople;
    });
  }

  loadNextPage(): void {
    this.currentPage++;
    this.loadPeople();
  }

  filterPeople(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPeople = this.listaPeople.filter(person => person.name.toLowerCase().includes(query));
  }

}
