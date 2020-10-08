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
  filteredItems: Item[];
  private items: Item[];
  private checkboxValues: string[] = [];

  constructor(private countriesListService: CountriesListGQL) {}

  ngOnInit(): void {
    this.countriesListService
      .fetch()
      .pipe(map((res) => res.data.countries))
      .subscribe((countries) => {
        this.continents = countries
          .map((country) => country.continent.name)
          .filter((name, index, thisArr) => thisArr.indexOf(name) === index);

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
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  onCheckboxClicked(checked: boolean, value: string) {
    if (checked) {
      this.checkboxValues.push(value);
    } else {
      const index = this.checkboxValues.indexOf(value);
      this.checkboxValues.splice(index, 1);
    }

    if (!this.checkboxValues.length) {
      this.filteredItems = [...this.items]
      return
    }

    this.filteredItems = this.items.filter((item) =>
      this.checkboxValues.includes(item.properties[0].value)
    );
  }
}
