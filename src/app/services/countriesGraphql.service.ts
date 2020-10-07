import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};



export type Query = {
  __typename?: 'Query';
  continents: Array<Continent>;
  continent?: Maybe<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  languages: Array<Language>;
  language?: Maybe<Language>;
};


export type QueryContinentsArgs = {
  filter?: Maybe<ContinentFilterInput>;
};


export type QueryContinentArgs = {
  code: Scalars['ID'];
};


export type QueryCountriesArgs = {
  filter?: Maybe<CountryFilterInput>;
};


export type QueryCountryArgs = {
  code: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  filter?: Maybe<LanguageFilterInput>;
};


export type QueryLanguageArgs = {
  code: Scalars['ID'];
};

export type ContinentFilterInput = {
  code?: Maybe<StringQueryOperatorInput>;
};

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['String']>;
  glob?: Maybe<Scalars['String']>;
};

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID'];
  name: Scalars['String'];
  countries: Array<Country>;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['ID'];
  name: Scalars['String'];
  native: Scalars['String'];
  phone: Scalars['String'];
  continent: Continent;
  capital?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  languages: Array<Language>;
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  states: Array<State>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  native?: Maybe<Scalars['String']>;
  rtl: Scalars['Boolean'];
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  country: Country;
};

export type CountryFilterInput = {
  code?: Maybe<StringQueryOperatorInput>;
  currency?: Maybe<StringQueryOperatorInput>;
  continent?: Maybe<StringQueryOperatorInput>;
};

export type LanguageFilterInput = {
  code?: Maybe<StringQueryOperatorInput>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CountriesListQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesListQuery = (
  { __typename?: 'Query' }
  & { countries: Array<(
    { __typename?: 'Country' }
    & Pick<Country, 'code' | 'name' | 'currency'>
    & { continent: (
      { __typename?: 'Continent' }
      & Pick<Continent, 'name'>
    ) }
  )> }
);

export type CountryDetailsQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type CountryDetailsQuery = (
  { __typename?: 'Query' }
  & { country?: Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, 'name' | 'native' | 'phone' | 'capital' | 'currency'>
    & { continent: (
      { __typename?: 'Continent' }
      & Pick<Continent, 'name'>
    ), languages: Array<(
      { __typename?: 'Language' }
      & Pick<Language, 'name'>
    )>, states: Array<(
      { __typename?: 'State' }
      & Pick<State, 'name'>
    )> }
  )> }
);

export const CountriesListDocument = gql`
    query countriesList {
  countries {
    code
    name
    currency
    continent {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CountriesListGQL extends Apollo.Query<CountriesListQuery, CountriesListQueryVariables> {
    document = CountriesListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CountryDetailsDocument = gql`
    query countryDetails($code: ID!) {
  country(code: $code) {
    name
    native
    phone
    continent {
      name
    }
    capital
    currency
    languages {
      name
    }
    states {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CountryDetailsGQL extends Apollo.Query<CountryDetailsQuery, CountryDetailsQueryVariables> {
    document = CountryDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }