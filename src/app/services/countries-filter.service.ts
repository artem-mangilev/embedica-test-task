import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { CountriesListGQL } from './countriesGraphql.service';

export interface CountryDetails {
  code: string;
  name: string;
  continent: string;
  currency: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesFilterService {
  private countryNameFilter: string = '';
  private currencyFilter: string = '';

  private continents: Map<string, boolean> = new Map();
  private currencies: Set<string> = new Set();

  private countries$: Observable<CountryDetails[]>;

  constructor(countriesListService: CountriesListGQL) {
    this.countries$ = countriesListService.fetch().pipe(
      map((response) => response.data.countries),
      map((countries) =>
        countries.map(({ name, continent, currency, code }) => ({
          name,
          continent: continent.name,
          currency: currency ? currency : 'None',
          code,
        }))
      ),
      tap((countries) => {
        countries.forEach(({ continent, currency }) => {
          this.continents.set(continent, false);
          this.currencies.add(currency);
        });
      }),
      shareReplay()
    );
  }

  getCountries() {
    return this.countries$;
  }

  filter(countries: CountryDetails[]) {
    const filters = [];

    if (this.isTextFilterApplied(this.countryNameFilter)) {
      filters.push(this.isNameValid.bind(this));
    }

    if (this.isTextFilterApplied(this.currencyFilter)) {
      filters.push(this.isCurrencyValid.bind(this));
    }

    if (this.isContinentFilterApplied()) {
      filters.push(this.isContinentValid.bind(this));
    }

    return countries.filter((country) => {
      return filters.every((filter) => filter(country));
    });
  }

  setCountryNameFilter(nameFilter: string) {
    this.countryNameFilter = nameFilter;
  }

  getCountryNameFilter(): string {
    return this.countryNameFilter;
  }

  addContinentFilter(continent: string) {
    this.continents.set(continent, true);
  }

  removeContinentFilter(continent: string) {
    this.continents.set(continent, false);
  }

  getContinentsFilter() {
    return this.continents;
  }

  setCurrenctyFilter(currency: string) {
    this.currencyFilter = currency;
  }

  getCurrencyFilter() {
    return this.currencyFilter;
  }

  getCurrencies() {
    return this.currencies;
  }

  private isNameValid(country: CountryDetails): boolean {
    return country.name
      .toLowerCase()
      .includes(this.countryNameFilter.toLowerCase());
  }

  private isContinentValid(country: CountryDetails): boolean {
    return this.continents.get(country.continent);
  }

  private isCurrencyValid(country: CountryDetails): boolean {
    return country.currency === this.currencyFilter;
  }

  private isContinentFilterApplied(): boolean {
    return [...this.continents.values()].some((value) => value === true);
  }

  private isTextFilterApplied(text: string): boolean {
    return !!text.trim().length;
  }
}
