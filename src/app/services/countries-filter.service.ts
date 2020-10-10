import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CountriesListGQL } from './countriesGraphql.service';

interface Country {
  name: string;
  continent: string;
  currency: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesFilterService {
  private countryNameFilter: string = '';
  private continentsFilter: string[] = [];
  private currencyFilter: string = '';

  private countries: Observable<Country[]>;

  constructor(countriesListService: CountriesListGQL) {
    this.countries = countriesListService.fetch().pipe(
      map((response) => response.data.countries),
      map((countries) =>
        countries.map((country) => {
          return {
            name: country.name,
            continent: country.continent.name,
            currency: country.currency,
          };
        })
      ),
      share()
    );
  }

  getCountries(): Observable<Country[]> {
    return this.countries.pipe(
      map((countries) =>
        countries
          .filter(this.isNameValid, this)
          .filter(this.isContinentValid, this)
          .filter(this.isCurrencyValid, this)
      )
    );
  }

  setCountryNameFilter(nameFilter: string) {
    this.countryNameFilter = nameFilter;
  }

  addContinentFilter(continent: string): number {
    return this.continentsFilter.push(continent);
  }

  removeContinentFilter(continent: string) {
    const index = this.continentsFilter.indexOf(continent);
    this.continentsFilter.splice(index, 1);

    return this.continentsFilter.length
  }

  setCurrenctyFilter(currency: string) {
    this.currencyFilter = currency;
  }

  private isNameValid(country: Country): boolean {
    if (!this.countryNameFilter.trim().length) {
      return true;
    }

    return country.name
      .toLowerCase()
      .includes(this.countryNameFilter.toLowerCase());
  }

  private isContinentValid(country: Country): boolean {
    if (!this.continentsFilter.length) {
      return true;
    }

    return this.continentsFilter.includes(country.continent);
  }

  private isCurrencyValid(country: Country): boolean {
    if (!this.currencyFilter.length) {
      return true;
    }

    return country.currency === this.currencyFilter;
  }
}
