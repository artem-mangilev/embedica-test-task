import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesFilterService } from 'src/app/services/countries-filter.service';
import { CountryDetails } from 'src/app/services/countries-filter.service';
import { Checkbox } from '../checkbox/checkbox.component';
import { PaginationParams } from 'src/app/pipes/paginate.pipe';
import { PaginationService } from 'src/app/services/pagination.service';
import { Subscription } from 'rxjs';
import { CountriesListService } from 'src/app/services/countries-list.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit, OnDestroy {
  searchPattern: string;
  dropdown: Checkbox[];
  currencies: string[];
  checkedCurrency: string;
  countries: CountryDetails[];
  filteredCountries: CountryDetails[] = [];
  paginationParams: PaginationParams = {
    itemsPerPage: 5,
    currentPage: 1,
  };
  subscription: Subscription;

  // TODO: find a better way to import assets (that will work locally and when deployed)
  // this approach ignores assets folder and creates dulicated images in dist/embedika-test-task
  icon = require('../../../assets/icons/go-to-details.svg').default;

  constructor(
    private countriesFilterService: CountriesFilterService,
    private countriesListService: CountriesListService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.countriesListService
      .getCountries()
      .subscribe((countries) => {
        this.dropdown = [
          ...this.countriesFilterService.getContinentsFilter(),
        ].map(([continent, fitered]) => ({
          text: continent,
          value: continent,
          checked: fitered,
        }));

        this.paginationParams = {
          ...this.paginationParams,
          currentPage: this.paginationService.getCurrentPage(),
        };

        this.currencies = [
          ...this.countriesFilterService.getCurrencies().values(),
        ];
        this.checkedCurrency = this.countriesFilterService.getCurrencyFilter();

        this.searchPattern = this.countriesFilterService.getCountryNameFilter();

        this.countries = countries;
        this.filteredCountries = this.countriesFilterService.filter(countries);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onInputValueChanged(value: string) {
    this.countriesFilterService.setCountryNameFilter(value);

    this.applyFilter();
  }

  onCheckboxUpdated(checkbox: Checkbox) {
    if (checkbox.checked) {
      this.countriesFilterService.addContinentFilter(checkbox.text);
    } else {
      this.countriesFilterService.removeContinentFilter(checkbox.text);
    }

    this.applyFilter();
  }

  onRadioSelected(value: string) {
    this.countriesFilterService.setCurrenctyFilter(value);

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
    this.filteredCountries = this.countriesFilterService.filter(this.countries);

    this.paginationParams = { ...this.paginationParams, currentPage: 1 };
  }
}
