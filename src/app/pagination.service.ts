import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pageChange = new EventEmitter()
  private totalPages

  setCurrentPage(page: number) {
    this.pageChange.emit(page)
  }

  setTotalPages(pages: number) {
    this.totalPages = pages
  }

  getTotalPages(): number {
    return this.totalPages
  }
}
