export type WeatherForecastErrorResponse = {
  code: 429001 | number;
  type: "Too Many Calls" | string;
  message: string;
};

export type WeatherForecastNowResponse = {
  data: {
    time: Date;
    values: {
      cloudBase: number;
      cloudCeiling: number;
      cloudCover: number;
      dewPoint: number;
      freezingRainIntensity: number;
      humidity: number;
      precipitationProbability: number;
      pressureSurfaceLevel: number;
      rainIntensity: number;
      sleetIntensity: number;
      snowIntensity: number;
      temperature: number;
      temperatureApparent: number;
      uvHealthConcern: number;
      uvIndex: number;
      visibility: number;
      weatherCode: number;
      windDirection: number;
      windGust: number;
      windSpeed: number;
    };
  };
  location: { lat: number; lon: number };
};

export type WeatherForecastNow = {
  time: Date;
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
};

export type WeatherForecastHourlyResponse = {
  timelines: {
    hourly: Array<{
      time: Date;
      values: {
        cloudBase: number;
        cloudCeiling: number;
        cloudCover: number;
        dewPoint: number;
        evapotranspiration: number;
        freezingRainIntensity: number;
        humidity: number;
        iceAccumulation: number;
        iceAccumulationLwe: number;
        precipitationProbability: number;
        pressureSurfaceLevel: number;
        rainAccumulation: number;
        rainAccumulationLwe: number;
        rainIntensity: number;
        sleetAccumulation: number;
        sleetAccumulationLwe: number;
        sleetIntensity: number;
        snowAccumulation: number;
        snowAccumulationLwe: number;
        snowIntensity: number;
        temperature: number;
        temperatureApparent: number;
        visibility: number;
        weatherCode: number;
        windDirection: number;
        windGust: number;
        windSpeed: number;
      };
    }>;
  };
  location: {
    lat: number;
    lon: number;
  };
};

export type WeatherForecastHourly = Array<{
  time: Date;
  cloudBase: number;
  cloudCeiling: number;
  cloudCover: number;
  dewPoint: number;
  evapotranspiration: number;
  freezingRainIntensity: number;
  humidity: number;
  iceAccumulation: number;
  iceAccumulationLwe: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainAccumulation: number;
  rainAccumulationLwe: number;
  rainIntensity: number;
  sleetAccumulation: number;
  sleetAccumulationLwe: number;
  sleetIntensity: number;
  snowAccumulation: number;
  snowAccumulationLwe: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}>;

export type WeatherForecastDailyResponse = any;

export type WeatherForecastDaily = any;
