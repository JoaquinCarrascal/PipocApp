import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ListResponse, myList } from '../../models/list-response';
import { MyListsService } from '../../services/my-lists.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemList } from '../../models/list-items';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';
import { debounceTime, forkJoin, map, Observable, of, OperatorFunction, switchMap } from 'rxjs';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">
        @if(lang === 'es-ES'){
          Confirmación de borrado
        }@else{
          Delete confirmation
        }
        </h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">

      <div class="alert alert-warning text-center" role="alert">
        @if(lang === 'es-ES'){
        <p class="mb-0">¿Está seguro de borrar éste listado?</p>
        <p class="mb-0">Ésta decisión no se podrá revertir</p>
        }@else{
        <p class="mb-0">Are you sure you want to delete this list?</p>
        <p class="mb-0">This decision can't be reverted</p>
        }
      </div>
      
			<button class="btn btn-danger d-block mx-auto" (click)="deleteList(id)" >
        @if(lang=='es-ES'){
          Borrar
        }@else{
          Delete
        }
        </button>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-success" (click)="activeModal.close('Close click')">
      @if(lang === 'es-ES'){  
      Cerrar
      }@else{
      Close
      }
    </button>
		</div>
	`,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  listServ = inject(MyListsService);
  lang = localStorage.getItem('lang') || 'es-ES';

  deleteList(id: number) {
    this.listServ.deleteList(id).subscribe(() => {
      this.deleteListId.emit(id);
      this.activeModal.close('Deleted');
    });
  }

  @Input() id !: number;
  @Output() deleteListId = new EventEmitter<number>();
}


@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.css'
})
export class MyListComponent implements OnInit {

  myList: myList[] = [];
  backPhotosMap: { [key: number]: string } = {};
  newListName: string = '';
  itemDetailsList: ItemList[] = [];
  query: string = '';
  model: any;
  lang = localStorage.getItem('lang') || 'es-ES';

  private modalService = inject(NgbModal);



  constructor(private listServ: MyListsService , private pipeDateForm: DateFormaterPipe) { }


  ngOnInit(): void {

    this.loadList();

  }

  loadList(): void{
    this.myList = [];
    this.backPhotosMap = {};

    this.listServ.getLists().subscribe((data: ListResponse) => {
      this.myList = data.results;
      this.myList.forEach(list => {
        this.loadBackPhoto(list.id);
      });
    });
  }

  loadBackPhoto(idList: number) {
    this.listServ.getListItems(idList).subscribe((data) => {
      for (let item of data.items) {
        if (item.backdrop_path) {
          this.backPhotosMap[idList] = 'https://image.tmdb.org/t/p/original/' + item.backdrop_path;
          return;
        }
      }
      this.backPhotosMap[idList] = 'https://placehold.co/450x250?text=Foto+no+encontrada';
    });
  }

  getBackPhoto(idList: number): string {
    return this.backPhotosMap[idList] || 'https://placehold.co/450x250?text=Foto+no+encontrada';
  }

  deleteList(idList: number) {

    this.myList = this.myList.filter(list => list.id !== idList);

  }

  createList() {
    this.listServ.createList(this.newListName).subscribe((data) => {
      
      this.listServ.getLists().subscribe((lres: ListResponse) => {
        
        const newList = lres.results.find(list => list.id === data.list_id);
        if (!newList) return;
        this.myList.push(newList);
        this.myList.forEach(list => {
          this.loadBackPhoto(list.id);
        });
        
      });

    });
    this.newListName = '';
  }

  deleteItemFromList(idList: number, idItem: number) {

    this.listServ.deleteItemFromList(idList, idItem).subscribe(() => {
      this.itemDetailsList = this.itemDetailsList.filter(item => item.id !== idItem);
      const modifiedListPosition = this.myList.findIndex(list => list.id === idList);
      this.myList[modifiedListPosition].item_count-=1;
      if(this.myList[modifiedListPosition].item_count == 0){ this.loadBackPhoto(idList); }
    });

  }

  open(listId: number) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = listId;
    modalRef.componentInstance.deleteListId.subscribe((id: number) => {
      this.deleteList(id);
    });
  }

  openVerticallyCentered(content: TemplateRef<any> , idList: number) {

    this.itemDetailsList = [];

    this.listServ.getListItems(idList).subscribe((data) => {
      this.itemDetailsList = data.items;

		  this.modalService.open(content, { centered: true , size: 'lg' , scrollable: true});
    });

	}

  search: OperatorFunction<string, readonly { title: string; poster_path: string ; release_date:string ; name: string ; first_air_date:string ; id: number}[]> 
    = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      switchMap((term) =>
        term === ''
          ? of([])
          : forkJoin([this.listServ.searchMovieItem(term) , this.listServ.searchTvItem(term)]).pipe(
              map((data) => data[0].results.map(result => ({
                title: result.title,
                poster_path: result.poster_path || '',
                release_date: result.release_date || '',
                name: '',
                first_air_date:'',
                id: result.id
              })).concat(data[1].results.map(result => ({
                name: result.name,
                poster_path: result.poster_path || '',
                first_air_date: result.first_air_date || '',
                release_date: '',
                title: '',
                id: result.id
              })))
              )
          )
      )
    );

	formatter = (x: { name: string }) => x.name;

  addItemToList(idList: number , idItem: number){

    this.listServ.checkIfItemExistsInList(idList, idItem).subscribe((data) => { 
      data.item_present ? null : 
      this.listServ.addItemToList(idList, idItem).subscribe(() => {
        const modifiedListPosition = this.myList.findIndex(list => list.id === idList);
        if(this.myList[modifiedListPosition].item_count == 0){ this.loadBackPhoto(idList); }
        this.myList[modifiedListPosition].item_count+=1;
        this.itemDetailsList = [];
        this.listServ.getListItems(idList).subscribe((data) => {
        this.itemDetailsList = data.items;

        });
      });
    });

  }

  getImageUrl(posterPath: string){

    return `https://image.tmdb.org/t/p/w200/${posterPath}`;
  
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }

  dateFormater(date: string): string{

    if(date != '' && date != undefined){
      return this.pipeDateForm.transform(date);
    }else{
      return '';
    }

  }

}