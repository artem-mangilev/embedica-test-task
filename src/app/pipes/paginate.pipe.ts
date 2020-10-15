import { Pipe, PipeTransform } from '@angular/core';
import { PaginationService } from '../services/pagination.service';

export interface PaginationParams {
  itemsPerPage: number;
  currentPage: number;
}

type Pages = Array<unknown[]>;

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  constructor(private paginationService: PaginationService) {}

  transform(items: unknown[], params: PaginationParams): unknown[] {
    this.paginationService.setCurrentPage(params.currentPage);

    const pages: Pages = [];

    for (let i = 0; i < items.length; i += params.itemsPerPage) {
      const pageEnd = i + params.itemsPerPage;

      pages.push(items[pageEnd] ? items.slice(i, pageEnd) : items.slice(i));
    }

    this.paginationService.setTotalPages(pages.length);

    const currentPage = params.currentPage - 1;
    return pages[currentPage];
  }
}
