import { Component, OnInit } from '@angular/core';
import { CountriesFilterService } from 'src/app/services/countries-filter.service';
import { CountryDetails } from 'src/app/services/countries-filter.service';
import { Checkbox } from '../dropdown/dropdown.component';
import { PaginationParams } from 'src/app/paginate.pipe';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  searchPattern: string;
  dropdown: Checkbox[];
  currencies: string[];
  checkedCurrency: string;
  filteredCountries: CountryDetails[] = [];
  paginationParams: PaginationParams = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(private countriesFilter: CountriesFilterService) {}

  ngOnInit(): void {
    this.countriesFilter.getCountries().subscribe((countries) => {
      this.dropdown = [...this.countriesFilter.getContinentsFilter()].map(
        ([continent, fitered]) => ({
          text: continent,
          checked: fitered,
        })
      );

      this.currencies = [...this.countriesFilter.getCurrencies().values()];
      this.checkedCurrency = this.countriesFilter.getCurrencyFilter();

      this.searchPattern = this.countriesFilter.getCountryNameFilter();

      this.filteredCountries = countries;
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

  onPageChanged(currentPage: number) {
    this.paginationParams = { ...this.paginationParams, currentPage };
  }

  countryToMap(country: CountryDetails) {
    return new Map([
      ['Continent', country.continent],
      ['Currency', country.currency],
    ]);
  }

  private applyFilter() {
    // TODO: subscriptions after each DOM event could cause memory leak, so fix this when find a better solution
    this.countriesFilter.getCountries().subscribe((countries) => {
      this.filteredCountries = countries;

      this.paginationParams = { ...this.paginationParams, currentPage: 1 };
    });
  }
}
