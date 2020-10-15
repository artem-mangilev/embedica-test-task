import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  pageChange = new EventEmitter();
  private totalPages;
  private currentPage;

  setCurrentPage(page: number) {
    this.currentPage = page;

    this.pageChange.emit(page);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setTotalPages(pages: number) {
    this.totalPages = pages;
  }

  getTotalPages(): number {
    return this.totalPages;
  }
}
