import { Component, Input } from '@angular/core';

export interface Item {
  name: string;
  properties: Map<string, string>;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() item: Item;

  constructor() {}
}
