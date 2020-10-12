import { Component, ContentChildren, Input, OnInit } from '@angular/core';

export interface RadioButton {
  value: string;
  text: string;
}

@Component({
  selector: 'app-radio',
  template: `
    <label class="radio">
      <span class="radio__input">
        <input type="radio" [name]="name" [value]="value" />
        <span class="radio__control"></span>
      </span>
      <span class="radio__label">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input() name = '';
  @Input() value = '';

  constructor() {}

  ngOnInit(): void {}
}
