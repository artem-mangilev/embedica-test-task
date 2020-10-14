import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CountryDetailsGQL } from 'src/app/services/countriesGraphql.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  name: string;
  native: string;
  capital: string;
  phone: string;
  continent: string;
  currency: string;
  languages: string;
  states: string;

  constructor(
    private route: ActivatedRoute,
    private countryDetails: CountryDetailsGQL
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((code) => this.countryDetails.fetch({ code })),
        map((response) => response.data.country)
      )
      .subscribe((country) => {
        this.name = country.name;
        this.native = country.native;

        this.capital = country.capital
          ? country.capital
          : 'There is no capital';

        this.phone = country.phone;
        this.continent = country.continent.name;

        this.currency = country.currency
          ? country.currency
          : 'There is no currency';

        const languages = country.languages.map((lang) => lang.name).join(', ');
        this.languages = languages ? languages : 'There are no languages';

        const states = country.states.map((state) => state.name).join(', ');
        this.states = states ? states : 'There are no states';
      });
  }

  getProperties() {
    return new Map([
      ['Native name', this.native],
      ['Capital', this.capital],
      ['Phone prefix', this.phone],
      ['Continent', this.continent],
      ['Currency', this.currency],
      ['Languages', this.languages],
      ['States', this.states],
    ]);
  }
}
