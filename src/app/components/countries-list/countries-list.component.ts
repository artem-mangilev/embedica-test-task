import { Component, OnInit } from '@angular/core';
import { CountriesListGQL } from '../../services/countriesGraphql.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  items;

  constructor(private countriesListService: CountriesListGQL) {}

  ngOnInit(): void {
    this.items = this.countriesListService.fetch().pipe(
      map((res) => res.data.countries),
      map((countries) =>
        countries.map((country) => ({
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
        }))
      )
    );
  }
}
