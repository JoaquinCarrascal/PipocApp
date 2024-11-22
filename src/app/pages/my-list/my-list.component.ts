import { Component, OnInit } from '@angular/core';
import {ListResponse , myList } from '../../models/list-response';
import { MyListsService } from '../../services/my-lists.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent implements OnInit {

myList: myList [] = [];

constructor(private listServ: MyListsService) { }



ngOnInit(): void { 

  this.listServ.getLists().subscribe((data: ListResponse) => {
    this.myList = data.results;
  });

}

}
