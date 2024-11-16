import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { ListadoPopularPeople, PopularPeopleResponse } from '../../models/popular-people-response';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  listaPeople: ListadoPopularPeople[] = [];
  filteredPeople: ListadoPopularPeople[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.peopleService.getPopularPeople(this.currentPage).subscribe((data: PopularPeopleResponse) => {
      this.listaPeople = data.results;
      this.filteredPeople = this.listaPeople;
      this.totalPages = data.total_pages;
      this.calculatePageNumbers();
    });
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPeople();
    }
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPeople();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadPeople();
  }

  calculatePageNumbers(): void {
    const firstPage = 1;
    const lastPage = this.totalPages;
    const prevPage = this.currentPage > 1 ? this.currentPage - 1 : null;
    const nextPage = this.currentPage < this.totalPages ? this.currentPage + 1 : null;
    const currentPage = this.currentPage;
  
    let pages: number[] = [];
  
    // Si estamos en la primera página, mostramos la página 1 y las dos siguientes
    if (this.currentPage === firstPage) {
      pages.push(firstPage); // Siempre mostramos la página 1
      if (nextPage) pages.push(nextPage);
      if (nextPage && nextPage + 1 <= lastPage) pages.push(nextPage + 1);
    } else {
      // Si no estamos en la primera página, mostramos la anterior, la actual y la siguiente
      if (prevPage) pages.push(prevPage);
      pages.push(currentPage);
      if (nextPage) pages.push(nextPage);
    }
  
    this.pageNumbers = pages;
  }
  
  
  

  filterPeople(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPeople = this.listaPeople.filter(person => person.name.toLowerCase().includes(query));
    this.currentPage = 1;  // Al buscar, regresamos a la primera página.
    this.calculatePageNumbers();  // Recalcular la paginación después de la búsqueda.
  }

  searchPeople(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const query = (keyboardEvent.target as HTMLInputElement).value.toLowerCase();
    
    // Filtrar la lista completa de actores
    const filteredResults = this.listaPeople.filter(person =>
      person.name.toLowerCase().includes(query)
    );
  
    // Actualizar filteredPeople con los resultados de la búsqueda
    this.filteredPeople = filteredResults;
  
    // Restablecer la primera página de los resultados de búsqueda
    this.currentPage = 1;
  
    // Recalcular las páginas disponibles según los resultados filtrados
    this.totalPages = Math.ceil(filteredResults.length / 20);  // Ajusta el número 20 según el número de actores por página
    this.calculatePageNumbers();
  }
  
  
  
  
  
  
}
