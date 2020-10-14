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
      });
  }
}
