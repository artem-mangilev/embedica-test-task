import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs'
import { CountryDetails } from './countries-filter.service';
import { CountriesListGQL } from './countriesGraphql.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesListService {
  private countries$: Observable<CountryDetails[]>

  constructor(countriesListGQLService: CountriesListGQL) {
    this.countries$ = countriesListGQLService.fetch().pipe(
      map((response) => response.data.countries),
      map((countries) =>
        countries.map(({ name, continent, currency, code }) => ({
          name,
          continent: continent.name,
          currency: currency ? currency : 'None',
          code,
        }))
      ),
      shareReplay()
    );
  }

  getCountries() {
    return this.countries$
  }
}
