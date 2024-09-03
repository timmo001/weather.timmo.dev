export type AccuweatherLocation = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: Country;
  Country: Country;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  SupplementalAdminAreas: SupplementalAdminArea[];
  DataSets: string[];
};

export type AdministrativeArea = {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
};

export type Country = {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
};

export type GeoPosition = {
  Latitude: number;
  Longitude: number;
  Elevation: Units;
};

export type Units = {
  Metric: Unit;
  Imperial: Unit;
};

export type Unit = {
  Value: number;
  Unit: string;
  UnitType: number;
};

export type SupplementalAdminArea = {
  Level: number;
  LocalizedName: string;
  EnglishName: string;
};

export type TimeZone = {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange: Date;
};

export interface AccuweatherCurrentConditions {
  LocalObservationDateTime: Date;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null;
  IsDayTime: boolean;
  Temperature: Units;
  MobileLink: string;
  Link: string;
}

export interface AccuweatherHourlyForecast {
  DateTime: Date;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: Temperature;
  PrecipitationProbability: number;
  MobileLink: string;
  Link: string;
}

export interface AccuweatherHourlyForecast {
  DateTime: Date;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  IsDaylight: boolean;
  Temperature: Temperature;
  PrecipitationProbability: number;
  MobileLink: string;
  Link: string;
}

export interface Temperature {
  Value: number;
  Unit: UnitEnum;
  UnitType: number;
}

export enum UnitEnum {
  C = "C",
  F = "F",
}
