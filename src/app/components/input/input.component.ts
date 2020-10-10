import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div class="field">
      <label class="field__label" [class.field__label_shown]="value.length">{{
        placeholder
      }}</label>
      <input
        class="field__input"
        #input
        [value]="value"
        (keyup)="sendValue(input.value)"
        (keyup)="setValue(input.value)"
        [placeholder]="placeholder"
      />
    </div>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Output() changeValueEvent = new EventEmitter();

  sendValue(value: string) {
    this.changeValueEvent.emit(value);
  }

  setValue(value: string) {
    this.value = value;
  }
}
