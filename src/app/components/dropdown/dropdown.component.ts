import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

export interface Checkbox {
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnChanges {
  @Input() name = '';
  @Input() checkboxes: Checkbox[] = [];
  @Output() checkboxUpdateEvent = new EventEmitter();

  selected = 0;
  isDropdownShown = false;

  ngOnChanges() {
    this.checkboxes && this.setSelected();
  }

  setSelected() {
    this.selected = this.checkboxes.filter(
      (checkbox) => checkbox.checked
    ).length;
  }

  handleCheckboxClick(checkboxIndex: number, checked: boolean) {
    const clickedCheckbox = this.checkboxes[checkboxIndex];

    clickedCheckbox.checked = checked;

    this.checkboxUpdateEvent.emit(clickedCheckbox);

    this.setSelected();
  }

  toggleDropdown() {
    this.isDropdownShown = !this.isDropdownShown;
  }
}
