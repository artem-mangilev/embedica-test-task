import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-arrow',
  template: `
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z"
        [class.arrow_enabled]="enabled"
        [class.arrow_disabled]="!enabled"
        [class.arrow_rotated]="direction === 'right'"
      />
    </svg>
  `,
  styleUrls: ['./pagination-arrow.component.scss'],
})
export class PaginationArrowComponent {
  @Input() enabled = true;
  @Input() direction: 'left' | 'right';
}
