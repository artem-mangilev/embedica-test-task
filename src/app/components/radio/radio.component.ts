import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface RadioButton {
  value: string;
  text: string;
}

@Component({
  selector: 'app-radio',
  template: `
    <label class="radio">
      <span class="radio__input" (input)="onSelected($event.target.value)">
        <input type="radio" [name]="name" [value]="value" [checked]="checked" />
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
  @Input() checked = false
  @Output() selectEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelected(value: string) {
    this.selectEvent.emit(value);
  }
}
