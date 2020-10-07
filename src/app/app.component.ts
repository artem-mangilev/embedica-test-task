import { Component } from '@angular/core';
import {
  CountriesListGQL,
  CountryDetailsGQL,
} from './services/countriesGraphql.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'embedica-test-task';

  constructor(private countryDetails: CountryDetailsGQL) {
    countryDetails.fetch({ code: 'US' }).subscribe((res) => {
      console.log(res.data.country)
    })
  }
}
