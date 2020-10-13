import { Pipe, PipeTransform } from '@angular/core';

interface PaginationParams {
  itemsPerPage: number;
  currentPage: number;
}

type Pages = Array<unknown[]>;

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(items: unknown[], params: PaginationParams): unknown[] {
    const pages: Pages = [];

    for (let i = 0; i < items.length; i += params.itemsPerPage) {
      const pageEnd = i + params.itemsPerPage;
      if (items[pageEnd]) {
        pages.push(items.slice(i, pageEnd));
      } else {
        pages.push(items.slice(i));
      }
    }

    const currentPage = params.currentPage - 1;
    return pages[currentPage];
  }
}
