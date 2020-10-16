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

  private countries: Observable<CountryDetails[]>;

  constructor(countriesListService: CountriesListGQL) {
    this.countries = countriesListService.fetch().pipe(
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

  getCountries(): Observable<CountryDetails[]> {
    return this.countries.pipe(
      map((countries) =>
        countries.filter(
          (country) =>
            this.isNameValid(country) &&
            this.isContinentValid(country) &&
            this.isCurrencyValid(country),
          this
        )
      )
    );
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
    if (!this.countryNameFilter.trim().length) {
      return true;
    }

    return country.name
      .toLowerCase()
      .includes(this.countryNameFilter.toLowerCase());
  }

  private isContinentValid(country: CountryDetails): boolean {
    const filterIsNotApplied = [...this.continents.values()].every(
      (value) => value === false
    );

    if (filterIsNotApplied) return true;

    return this.continents.get(country.continent);
  }

  private isCurrencyValid(country: CountryDetails): boolean {
    if (!this.currencyFilter.length) {
      return true;
    }

    return country.currency === this.currencyFilter;
  }
}
