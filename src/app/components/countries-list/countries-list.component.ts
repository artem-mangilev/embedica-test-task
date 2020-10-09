import { Component, OnInit } from '@angular/core';
import { CountriesListGQL } from '../../services/countriesGraphql.service';
import { map } from 'rxjs/operators';
import { Item } from '../list-item/list-item.component';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  continents;
  currencies;
  filteredItems: Item[];
  private items: Item[];

  private inputValue: string = '';
  checkboxValues: string[] = [];
  private radioValue: string = '';

  constructor(private countriesListService: CountriesListGQL) {}

  ngOnInit(): void {
    this.countriesListService
      .fetch()
      .pipe(map((res) => res.data.countries))
      .subscribe((countries) => {
        this.continents = countries
          .map((country) => country.continent.name)
          .filter((name, index, thisArr) => thisArr.indexOf(name) === index);

        this.currencies = countries
          .map((country) => country.currency)
          .filter(
            (currency, index, thisArr) => thisArr.indexOf(currency) === index
          );

        this.items = countries.map((country) => ({
          name: country.name,
          properties: [
            {
              key: 'Continent',
              value: country.continent.name,
            },
            {
              key: 'Currency',
              value: country.currency,
            },
          ],
        }));

        this.filteredItems = [...this.items];
      });
  }

  onKey(value: string) {
    this.inputValue = value;
    
    this.filteredItems = this.getFilteredItems();
  }

  onCheckboxClicked(checked: boolean, value: string) {
    if (checked) {
      this.checkboxValues.push(value);
    } else {
      const index = this.checkboxValues.indexOf(value);
      this.checkboxValues.splice(index, 1);
    }

    this.filteredItems = this.getFilteredItems();
  }

  onRadioSelected(value: string) {
    this.radioValue = value;

    this.filteredItems = this.getFilteredItems();
  }

  private getFilteredItems() {
    return this.items
      .filter(this.inputFilterCondition, this)
      .filter(this.checkboxFilterCondition, this)
      .filter(this.radioFilterCondition, this);
  }

  private inputFilterCondition(item: Item): boolean {
    // if input is empty, filter should not apply
    if (!this.inputValue.trim().length) {
      return true;
    }

    return item.name.toLowerCase().includes(this.inputValue.toLowerCase());
  }

  private checkboxFilterCondition(item: Item): boolean {
    // if there are no checked checkboxes, filter should not apply
    if (!this.checkboxValues.length) {
      return true;
    }

    return this.checkboxValues.includes(item.properties[0].value);
  }

  private radioFilterCondition(item: Item): boolean {
    // if radio button is not selected, filter should not apply
    if (!this.radioValue.length) {
      return true;
    }

    return item.properties[1].value === this.radioValue;
  }
}
