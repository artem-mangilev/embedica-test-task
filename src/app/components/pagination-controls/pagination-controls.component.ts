import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/pagination.service';

@Component({
  selector: 'app-pagination-controls',
  template: `
    <div class="pagination">
      <a class="pagination__prev" (click)="onPrevClick()"><</a>
      <span class="pagination__current-page">
        {{ currentPage }}
      </span>
      <a class="pagination__next" (click)="onNextClick()">></a>
    </div>
  `,
  styleUrls: ['./pagination-controls.component.scss'],
})
export class PaginationControlsComponent implements OnInit {
  currentPage: number;
  @Output() changePage = new EventEmitter();

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.pageChange.subscribe((page) => {
      this.currentPage = page;
    });
  }

  onPrevClick() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }

    this.changePage.emit(this.currentPage);
  }

  onNextClick() {
    if (this.currentPage < this.paginationService.getTotalPages()) {
      this.currentPage = this.currentPage + 1;
    }

    this.changePage.emit(this.currentPage);
  }
}
