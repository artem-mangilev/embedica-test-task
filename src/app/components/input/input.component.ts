import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div class="field">
      <label class="field__label" [class.field__label_shown]="value.length">
        {{ placeholder }}
      </label>
      <input
        class="field__input"
        #input
        [value]="value"
        (keyup)="sendValue(input.value)"
        (keyup)="setValue(input.value)"
        (click)="handleClickEvent($event)"
        [placeholder]="placeholder"
        [readOnly]="readonly"
      />
    </div>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Output() changeValueEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();

  sendValue(value: string) {
    this.changeValueEvent.emit(value);
  }

  setValue(value: string) {
    this.value = value;
  }

  handleClickEvent(event) {
    this.clickEvent.emit(event);
  }
}
