import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {

  constructor(private peopleService : PeopleService) { }

  ngOnInit(): void {
  }

  getPersonDetails(id: number) {
    this.peopleService.getPersonDetails(id).subscribe((data) => {
      return data;
    });
  }

  getPersonCombinedCredits(id: number) {
    this.peopleService.getPersonCombinedCredits(id).subscribe((data) => {
      return data;
    });
  }

  getPersonImages(id: number) {
    this.peopleService.getPersonImages(id).subscribe((data) => {
      return data;
    });
  }

  getPersonExternalIds(id: number) {
    this.peopleService.getPersonExternalIds(id).subscribe((data) => {
      return data;
    });
  }
}
