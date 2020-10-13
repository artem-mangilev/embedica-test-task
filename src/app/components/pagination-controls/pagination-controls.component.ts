import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatePipe } from 'src/app/paginate.pipe';

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
export class PaginationControlsComponent {
  @Input() currentPage: number;
  @Output() changePage = new EventEmitter();

  onPrevClick() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }

    this.changePage.emit(this.currentPage);
  }

  onNextClick() {
    this.currentPage = this.currentPage + 1;

    this.changePage.emit(this.currentPage);
  }
}
