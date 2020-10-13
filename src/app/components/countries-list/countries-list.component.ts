import { Component, OnInit } from '@angular/core';
import { Item } from '../list-item/list-item.component';
import {
  CountriesFilterService,
  CountryDetails,
} from 'src/app/services/countries-filter.service';
import { Checkbox } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  dropdown: Checkbox[];
  currencies;
  filteredItems: Item[] = [];
  currentPage = 1;

  constructor(private countriesFilter: CountriesFilterService) {}

  ngOnInit(): void {
    this.countriesFilter.getCountries().subscribe((countries) => {
      this.dropdown = countries
        .map((country) => country.continent)
        .filter(this.isElementUnique, this)
        .map((continent) => ({
          text: continent,
          checked: false,
        }));

      this.currencies = countries
        .map((country) => country.currency)
        .filter(this.isElementUnique, this);

      this.filteredItems = this.countriesToItems(countries);
    });
  }

  onInputValueChanged(value: string) {
    this.countriesFilter.setCountryNameFilter(value);

    this.applyFilter();
  }

  onCheckboxUpdated(checkbox: Checkbox) {
    if (checkbox.checked) {
      this.countriesFilter.addContinentFilter(checkbox.text);
    } else {
      this.countriesFilter.removeContinentFilter(checkbox.text);
    }

    this.applyFilter();
  }

  onRadioSelected(value: string) {
    this.countriesFilter.setCurrenctyFilter(value);

    this.applyFilter();
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
  }

  private isElementUnique(
    elememnt: string,
    index: number,
    array: string[]
  ): boolean {
    return array.indexOf(elememnt) === index;
  }

  private countriesToItems(countries: CountryDetails[]) {
    return countries.map((country) => ({
      name: country.name,
      properties: new Map([
        ['Continent', country.continent],
        ['Currency', country.currency],
      ]),
    }));
  }

  private applyFilter() {
    this.countriesFilter.getCountries().subscribe((countries) => {
      this.filteredItems = this.countriesToItems(countries);

      this.currentPage = 1;
    });
  }
}
