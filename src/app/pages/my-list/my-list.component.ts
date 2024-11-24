import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ListResponse, myList } from '../../models/list-response';
import { MyListsService } from '../../services/my-lists.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemList } from '../../models/list-items';
import { DateFormaterPipe } from '../../pipes/date-formater.pipe';

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Confirmación de borrado</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">

      <div class="alert alert-warning text-center" role="alert">
        <p class="mb-0">¿Está seguro de borrar éste listado?</p>
        <p class="mb-0">Ésta decisión no se podrá revertir</p>
      </div>
      
			<button class="btn btn-danger d-block mx-auto" (click)="deleteList(id)" >Borrar</button>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-success" (click)="activeModal.close('Close click')">Cerrar</button>
		</div>
	`,
})
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
  listServ = inject(MyListsService);

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

  private modalService = inject(NgbModal);



  constructor(private listServ: MyListsService , private pipeDateForm: DateFormaterPipe) { }


  ngOnInit(): void {

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
      this.ngOnInit();
    });
    this.newListName = '';
  }

  deleteItemFromList(idList: number, idItem: number) {

    this.listServ.deleteItemFromList(idList, idItem).subscribe(() => {
      this.itemDetailsList = this.itemDetailsList.filter(item => item.id !== idItem);
      this.ngOnInit();
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

  getImageUrl(posterPath: string){

    return `https://image.tmdb.org/t/p/w200/${posterPath}`;
  
  }

  punctFormater(num: number): number{

    return num * 10;
  
  }

  dateFormater(date: string): string{
  
    return this.pipeDateForm.transform(date);
    
  }

}
