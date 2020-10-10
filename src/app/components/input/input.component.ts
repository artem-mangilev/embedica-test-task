import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <input #input [value]="value" (keyup)="sendValue(input.value)" />
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() value = '';
  @Output() changeValueEvent = new EventEmitter();

  sendValue(value: string) {
    this.changeValueEvent.emit(value);
  }
}
