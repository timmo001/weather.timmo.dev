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
  windDirectionCardinal: string;
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

export type WeatherForecastHourlyCharts = {
  temperatures: WeatherForecastHourlyTemperatureChart;
  humidities: WeatherForecastHourlyHumidityChart;
  windSpeeds: WeatherForecastHourlyWindSpeedChart;
  precipitations: WeatherForecastHourlyAccumulationChart;
};

export type WeatherForecastHourlyTemperatureChart = Array<{
  time: string;
  temperature: number;
  temperatureApparent: number;
}>;

export type WeatherForecastHourlyHumidityChart = Array<{
  time: string;
  humidity: number;
}>;

export type WeatherForecastHourlyWindSpeedChart = Array<{
  time: string;
  windSpeed: number;
}>;

export type WeatherForecastHourlyAccumulationChart = Array<{
  time: string;
  rainAccumulation: number;
  sleetAccumulation: number;
  snowAccumulation: number;
  iceAccumulation: number;
}>;

export type WeatherForecastDailyResponse = {
  timelines: {
    daily: Array<{
      time: Date;
      values: {
        cloudBaseAvg: number;
        cloudBaseMax: number;
        cloudBaseMin: number;
        cloudCeilingAvg: number;
        cloudCeilingMax: number;
        cloudCeilingMin: number;
        cloudCoverAvg: number;
        cloudCoverMax: number;
        cloudCoverMin: number;
        dewPointAvg: number;
        dewPointMax: number;
        dewPointMin: number;
        evapotranspirationAvg: number;
        evapotranspirationMax: number;
        evapotranspirationMin: number;
        evapotranspirationSum: number;
        freezingRainIntensityAvg: number;
        freezingRainIntensityMax: number;
        freezingRainIntensityMin: number;
        humidityAvg: number;
        humidityMax: number;
        humidityMin: number;
        iceAccumulationAvg: number;
        iceAccumulationLweAvg: number;
        iceAccumulationLweMax: number;
        iceAccumulationLweMin: number;
        iceAccumulationLweSum: number;
        iceAccumulationMax: number;
        iceAccumulationMin: number;
        iceAccumulationSum: number;
        moonriseTime: Date;
        moonsetTime: Date;
        precipitationProbabilityAvg: number;
        precipitationProbabilityMax: number;
        precipitationProbabilityMin: number;
        pressureSurfaceLevelAvg: number;
        pressureSurfaceLevelMax: number;
        pressureSurfaceLevelMin: number;
        rainAccumulationAvg: number;
        rainAccumulationLweAvg: number;
        rainAccumulationLweMax: number;
        rainAccumulationLweMin: number;
        rainAccumulationMax: number;
        rainAccumulationMin: number;
        rainAccumulationSum: number;
        rainIntensityAvg: number;
        rainIntensityMax: number;
        rainIntensityMin: number;
        sleetAccumulationAvg: number;
        sleetAccumulationLweAvg: number;
        sleetAccumulationLweMax: number;
        sleetAccumulationLweMin: number;
        sleetAccumulationLweSum: number;
        sleetAccumulationMax: number;
        sleetAccumulationMin: number;
        sleetAccumulationSum: number;
        sleetIntensityAvg: number;
        sleetIntensityMax: number;
        sleetIntensityMin: number;
        snowAccumulationAvg: number;
        snowAccumulationLweAvg: number;
        snowAccumulationLweMax: number;
        snowAccumulationLweMin: number;
        snowAccumulationLweSum: number;
        snowAccumulationMax: number;
        snowAccumulationMin: number;
        snowAccumulationSum: number;
        snowIntensityAvg: number;
        snowIntensityMax: number;
        snowIntensityMin: number;
        sunriseTime: Date;
        sunsetTime: Date;
        temperatureApparentAvg: number;
        temperatureApparentMax: number;
        temperatureApparentMin: number;
        temperatureAvg: number;
        temperatureMax: number;
        temperatureMin: number;
        uvHealthConcernAvg: number;
        uvHealthConcernMax: number;
        uvHealthConcernMin: number;
        uvIndexAvg: number;
        uvIndexMax: number;
        uvIndexMin: number;
        visibilityAvg: number;
        visibilityMax: number;
        visibilityMin: number;
        weatherCodeMax: number;
        weatherCodeMin: number;
        windDirectionAvg: number;
        windGustAvg: number;
        windGustMax: number;
        windGustMin: number;
        windSpeedAvg: number;
        windSpeedMax: number;
        windSpeedMin: number;
      };
    }>;
  };
  location: {
    lat: number;
    lon: number;
  };
};

export type WeatherForecastDaily = Array<{
  time: Date;
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationLweSum: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: Date;
  moonsetTime: Date;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationLweAvg: number;
  rainAccumulationLweMax: number;
  rainAccumulationLweMin: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg: number;
  sleetAccumulationLweAvg: number;
  sleetAccumulationLweMax: number;
  sleetAccumulationLweMin: number;
  sleetAccumulationLweSum: number;
  sleetAccumulationMax: number;
  sleetAccumulationMin: number;
  sleetAccumulationSum: number;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationLweSum: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: Date;
  sunsetTime: Date;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg: number;
  uvHealthConcernMax: number;
  uvHealthConcernMin: number;
  uvIndexAvg: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
}>;

export type WeatherForecastDailyCharts = {
  temperatures: WeatherForecastDailyTemperatureChart;
  humidities: WeatherForecastDailyHumidityChart;
  windSpeeds: WeatherForecastDailyWindSpeedChart;
  precipitations: WeatherForecastDailyAccumulationChart;
};

export type WeatherForecastDailyTemperatureChart = Array<{
  time: string;
  temperatureMin: number;
  temperatureMax: number;
  temperatureAvg: number;
  temperatureRange: [number, number];
}>;

export type WeatherForecastDailyHumidityChart = Array<{
  time: string;
  humidityMin: number;
  humidityMax: number;
  humidityAvg: number;
  humidityRange: [number, number];
}>;

export type WeatherForecastDailyWindSpeedChart = Array<{
  time: string;
  windSpeedMin: number;
  windSpeedMax: number;
  windSpeedAvg: number;
  windSpeedRange: [number, number];
}>;

export type WeatherForecastDailyAccumulationChart = Array<{
  time: string;
  rainAccumulationMin: number;
  rainAccumulationMax: number;
  rainAccumulationAvg: number;
  rainAccumulationRange: [number, number];
  rainAccumulationSum: number;
  sleetAccumulationMin: number;
  sleetAccumulationMax: number;
  sleetAccumulationAvg: number;
  sleetAccumulationRange: [number, number];
  sleetAccumulationSum: number;
  snowAccumulationMin: number;
  snowAccumulationMax: number;
  snowAccumulationAvg: number;
  snowAccumulationRange: [number, number];
  snowAccumulationSum: number;
  iceAccumulationMin: number;
  iceAccumulationMax: number;
  iceAccumulationAvg: number;
  iceAccumulationRange: [number, number];
  iceAccumulationSum: number;
}>;
