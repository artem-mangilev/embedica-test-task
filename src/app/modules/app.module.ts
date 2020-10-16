import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { CountriesListComponent } from '../components/countries-list/countries-list.component';
import { CountryDetailsComponent } from '../components/country-details/country-details.component';
import { PropertiesComponent } from '../components/properties/properties.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from '../components/input/input.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { RadioComponent } from '../components/radio/radio.component';
import { PaginatePipe } from '../pipes/paginate.pipe';
import { PaginationControlsComponent } from '../components/pagination-controls/pagination-controls.component';
import { PaginationArrowComponent } from '../components/pagination-arrow/pagination-arrow.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    CountryDetailsComponent,
    PropertiesComponent,
    InputComponent,
    DropdownComponent,
    RadioComponent,
    PaginatePipe,
    PaginationControlsComponent,
    PaginationArrowComponent,
    CheckboxComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
