import { Component, OnInit } from '@angular/core';
import { Item } from '../list-item/list-item.component';
import {
  CountriesFilterService,
  CountryDetails,
} from 'src/app/services/countries-filter.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  continents;
  currencies;
  filteredItems: Item[];
  checkboxes = 0;

  constructor(private countriesFilter: CountriesFilterService) {}

  ngOnInit(): void {
    this.countriesFilter.getCountries().subscribe((countries) => {
      this.continents = countries
        .map((country) => country.continent)
        .filter(this.isElementUnique, this);

      this.currencies = countries
        .map((country) => country.currency)
        .filter(this.isElementUnique, this);

      this.filteredItems = this.countriesToItems(countries);
    });
  }

  onInputValueChanged(value: string) {
    this.countriesFilter.setCountryNameFilter(value);

    this.countriesFilter.getCountries().subscribe((countries) => {
      this.filteredItems = this.countriesToItems(countries);
    });
  }

  onCheckboxClicked(checked: boolean, value: string) {
    if (checked) {
      this.checkboxes = this.countriesFilter.addContinentFilter(value);
    } else {
      this.checkboxes = this.countriesFilter.removeContinentFilter(value);
    }

    this.countriesFilter.getCountries().subscribe((countries) => {
      this.filteredItems = this.countriesToItems(countries);
    });
  }

  onRadioSelected(value: string) {
    this.countriesFilter.setCurrenctyFilter(value);

    this.countriesFilter.getCountries().subscribe((countries) => {
      this.filteredItems = this.countriesToItems(countries);
    });
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
}
