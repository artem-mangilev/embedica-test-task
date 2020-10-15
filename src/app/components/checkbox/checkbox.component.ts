import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Checkbox {
  text: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-checkbox',
  template: `
    <label class="checkbox">
      <input
        class="checkbox__control"
        type="checkbox"
        [checked]="checked"
        [value]="value"
        #elem
        (input)="
          onChecked({ value: elem.value, text: text, checked: elem.checked })
        "
      />
      <span class="checkbox__label">{{ text }}</span>
    </label>
  `,
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() text = '';
  @Input() value = '';
  @Input() checked = false;
  @Output() checkEvent = new EventEmitter<Checkbox>();

  onChecked(checkbox: Checkbox) {
    this.checkEvent.emit(checkbox);
  }
}
