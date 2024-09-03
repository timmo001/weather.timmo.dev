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
  Unit: TemperatureUnit | string;
  UnitType: number;
}

export enum TemperatureUnit {
  C = "C",
  F = "F",
}

export interface AccuweatherDailyForecast {
  Headline: Headline;
  DailyForecasts: DailyForecast[];
}

export interface DailyForecast {
  Date: Date;
  EpochDate: number;
  Sun: Sun;
  Moon: Moon;
  Temperature: RealFeelTemperature;
  RealFeelTemperature: RealFeelTemperature;
  RealFeelTemperatureShade: RealFeelTemperature;
  HoursOfSun: number;
  DegreeDaySummary: DegreeDaySummary;
  AirAndPollen: AirAndPollen[];
  Day: Day;
  Night: Day;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface AirAndPollen {
  Name: string;
  Value: number;
  Category: Category | string;
  CategoryValue: number;
  Type?: string;
}

export enum Category {
  Good = "Good",
  Moderate = "Moderate",
}

export interface Day {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
  ShortPhrase: string;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  Wind: Wind;
  WindGust: Wind;
  TotalLiquid: Measurement;
  Rain: Measurement;
  Snow: Measurement;
  Ice: Measurement;
  HoursOfPrecipitation: number;
  HoursOfRain: number;
  HoursOfSnow: number;
  HoursOfIce: number;
  CloudCover: number;
  Evapotranspiration: Measurement;
  SolarIrradiance: Measurement;
  RelativeHumidity: RelativeHumidity;
  WetBulbTemperature: WetBulbTemperature;
  WetBulbGlobeTemperature: WetBulbTemperature;
}

export interface Measurement {
  Value: number;
  Unit: TemperatureUnit | MeasurementUnit | string;
  UnitType: number;
  Phrase?: Phrase | string;
}

export enum Phrase {
  Chilly = "Chilly",
  Cool = "Cool",
  Pleasant = "Pleasant",
}

export enum MeasurementUnit {
  CM = "cm",
  KMH = "km/h",
  Mm = "mm",
  WM = "W/m²",
}

export interface RelativeHumidity {
  Minimum: number;
  Maximum: number;
  Average: number;
}

export interface WetBulbTemperature {
  Minimum: Measurement;
  Maximum: Measurement;
  Average: Measurement;
}

export interface Wind {
  Speed: Measurement;
  Direction: Direction;
}

export interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

export interface DegreeDaySummary {
  Heating: Measurement;
  Cooling: Measurement;
}

export interface Moon {
  Rise: Date;
  EpochRise: number;
  Set: Date;
  EpochSet: number;
  Phase: string;
  Age: number;
}

export interface RealFeelTemperature {
  Minimum: Measurement;
  Maximum: Measurement;
}

export interface Sun {
  Rise: Date;
  EpochRise: number;
  Set: Date;
  EpochSet: number;
}

export interface Headline {
  EffectiveDate: Date;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: Date;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}
