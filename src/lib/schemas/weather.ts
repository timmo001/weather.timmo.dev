import { z } from "zod";

import { ValuesSchema } from "~/lib/schemas/tomorrow-io";

//
// Timelines
//
export const WeatherForecastTimelinesSchema = z.object({
  current: ValuesSchema.extend({
    time: z.string(),
  }),
//   hourly: z.array(
//     z.object({
//       time: z.string(),
//       values: ValuesSchema.optional(),
//     }),
//   ),
//   daily: z.array(
//     z.object({
//       time: z.string(),
//       values: ValuesSchema.optional(),
//     }),
//   ),
});
export type WeatherForecastTimelines = z.infer<
  typeof WeatherForecastTimelinesSchema
>;

//
// Now
//
export const WeatherForecastNowSchema = z.object({
  time: z.string(),
  cloudBase: z.number(),
  cloudCeiling: z.number(),
  cloudCover: z.number(),
  dewPoint: z.number(),
  freezingRainIntensity: z.number(),
  humidity: z.number(),
  precipitationIntensity: z.number(),
  precipitationProbability: z.number(),
  precipitationType: z.number(),
  pressureSurfaceLevel: z.number(),
  rainIntensity: z.number(),
  sleetIntensity: z.number(),
  snowIntensity: z.number(),
  temperature: z.number(),
  temperatureApparent: z.number(),
  uvHealthConcern: z.number(),
  uvIndex: z.number(),
  visibility: z.number(),
  weatherCode: z.number(),
  windDirection: z.number(),
  windDirectionCardinal: z.string(),
  windGust: z.number(),
  windSpeed: z.number(),
});
export type WeatherForecastNow = z.infer<typeof WeatherForecastNowSchema>;

//
// Hourly
//
export const WeatherForecastHourlySchema = z.array(
  z.object({
    time: z.string(),
    cloudBase: z.number(),
    cloudCeiling: z.number(),
    cloudCover: z.number(),
    dewPoint: z.number(),
    evapotranspiration: z.number(),
    freezingRainIntensity: z.number(),
    humidity: z.number(),
    iceAccumulation: z.number(),
    precipitationProbability: z.number(),
    pressureSurfaceLevel: z.number(),
    rainAccumulation: z.number(),
    rainIntensity: z.number(),
    sleetAccumulation: z.number(),
    sleetIntensity: z.number(),
    snowAccumulation: z.number(),
    snowIntensity: z.number(),
    temperature: z.number(),
    temperatureApparent: z.number(),
    visibility: z.number(),
    weatherCode: z.number(),
    windDirection: z.number(),
    windGust: z.number(),
    windSpeed: z.number(),
  }),
);
export type WeatherForecastHourly = z.infer<typeof WeatherForecastHourlySchema>;

export const WeatherForecastHourlyTemperatureChartSchema = z.array(
  z.object({
    time: z.string(),
    temperature: z.number(),
    temperatureApparent: z.number(),
  }),
);
export type WeatherForecastHourlyTemperatureChart = z.infer<
  typeof WeatherForecastHourlyTemperatureChartSchema
>;

export const WeatherForecastHourlyHumidityChartSchema = z.array(
  z.object({
    time: z.string(),
    humidity: z.number(),
  }),
);
export type WeatherForecastHourlyHumidityChart = z.infer<
  typeof WeatherForecastHourlyHumidityChartSchema
>;

export const WeatherForecastHourlyWindSpeedChartSchema = z.array(
  z.object({
    time: z.string(),
    windSpeed: z.number(),
  }),
);
export type WeatherForecastHourlyWindSpeedChart = z.infer<
  typeof WeatherForecastHourlyWindSpeedChartSchema
>;

export const WeatherForecastHourlyAccumulationChartSchema = z.array(
  z.object({
    time: z.string(),
    rainAccumulation: z.number(),
    sleetAccumulation: z.number(),
    snowAccumulation: z.number(),
    iceAccumulation: z.number(),
  }),
);
export type WeatherForecastHourlyAccumulationChart = z.infer<
  typeof WeatherForecastHourlyAccumulationChartSchema
>;

export const WeatherForecastHourlyChartsSchema = z.object({
  temperatures: WeatherForecastHourlyTemperatureChartSchema,
  humidities: WeatherForecastHourlyHumidityChartSchema,
  windSpeeds: WeatherForecastHourlyWindSpeedChartSchema,
  precipitations: WeatherForecastHourlyAccumulationChartSchema,
});
export type WeatherForecastHourlyCharts = z.infer<
  typeof WeatherForecastHourlyChartsSchema
>;

//
// Daily
//
export const WeatherForecastDailySchema = z.array(
  z.object({
    time: z.string(),
    cloudBaseAvg: z.number(),
    cloudBaseMax: z.number(),
    cloudBaseMin: z.number(),
    cloudCeilingAvg: z.number(),
    cloudCeilingMax: z.number(),
    cloudCeilingMin: z.number(),
    cloudCoverAvg: z.number(),
    cloudCoverMax: z.number(),
    cloudCoverMin: z.number(),
    dewPointAvg: z.number(),
    dewPointMax: z.number(),
    dewPointMin: z.number(),
    evapotranspirationAvg: z.number(),
    evapotranspirationMax: z.number(),
    evapotranspirationMin: z.number(),
    evapotranspirationSum: z.number(),
    freezingRainIntensityAvg: z.number(),
    freezingRainIntensityMax: z.number(),
    freezingRainIntensityMin: z.number(),
    humidityAvg: z.number(),
    humidityMax: z.number(),
    humidityMin: z.number(),
    iceAccumulationAvg: z.number(),
    iceAccumulationMax: z.number(),
    iceAccumulationMin: z.number(),
    iceAccumulationSum: z.number(),
    moonriseTime: z.string(),
    moonsetTime: z.string(),
    precipitationProbabilityAvg: z.number(),
    precipitationProbabilityMax: z.number(),
    precipitationProbabilityMin: z.number(),
    pressureSurfaceLevelAvg: z.number(),
    pressureSurfaceLevelMax: z.number(),
    pressureSurfaceLevelMin: z.number(),
    rainAccumulationAvg: z.number(),
    rainAccumulationMax: z.number(),
    rainAccumulationMin: z.number(),
    rainAccumulationSum: z.number(),
    rainIntensityAvg: z.number(),
    rainIntensityMax: z.number(),
    rainIntensityMin: z.number(),
    sleetAccumulationAvg: z.number(),
    sleetAccumulationMax: z.number(),
    sleetAccumulationMin: z.number(),
    sleetAccumulationSum: z.number(),
    sleetIntensityAvg: z.number(),
    sleetIntensityMax: z.number(),
    sleetIntensityMin: z.number(),
    snowAccumulationAvg: z.number(),
    snowAccumulationMax: z.number(),
    snowAccumulationMin: z.number(),
    snowAccumulationSum: z.number(),
    snowIntensityAvg: z.number(),
    snowIntensityMax: z.number(),
    snowIntensityMin: z.number(),
    sunriseTime: z.string(),
    sunsetTime: z.string(),
    temperatureApparentAvg: z.number(),
    temperatureApparentMax: z.number(),
    temperatureApparentMin: z.number(),
    temperatureAvg: z.number(),
    temperatureMax: z.number(),
    temperatureMin: z.number(),
    uvHealthConcernAvg: z.number(),
    uvHealthConcernMax: z.number(),
    uvHealthConcernMin: z.number(),
    uvIndexAvg: z.number(),
    uvIndexMax: z.number(),
    uvIndexMin: z.number(),
    visibilityAvg: z.number(),
    visibilityMax: z.number(),
    visibilityMin: z.number(),
    weatherCodeMax: z.number(),
    weatherCodeMin: z.number(),
    windDirectionAvg: z.number(),
    windGustAvg: z.number(),
    windGustMax: z.number(),
    windGustMin: z.number(),
    windSpeedAvg: z.number(),
    windSpeedMax: z.number(),
    windSpeedMin: z.number(),
  }),
);
export type WeatherForecastDaily = z.infer<typeof WeatherForecastDailySchema>;

export const WeatherForecastDailyTemperatureChartSchema = z.array(
  z.object({
    time: z.string(),
    temperatureMin: z.number(),
    temperatureMax: z.number(),
    temperatureAvg: z.number(),
    temperatureRange: z.tuple([z.number(), z.number()]),
  }),
);
export type WeatherForecastDailyTemperatureChart = z.infer<
  typeof WeatherForecastDailyTemperatureChartSchema
>;

export const WeatherForecastDailyHumidityChartSchema = z.array(
  z.object({
    time: z.string(),
    humidityMin: z.number(),
    humidityMax: z.number(),
    humidityAvg: z.number(),
    humidityRange: z.tuple([z.number(), z.number()]),
  }),
);
export type WeatherForecastDailyHumidityChart = z.infer<
  typeof WeatherForecastDailyHumidityChartSchema
>;

export const WeatherForecastDailyWindSpeedChartSchema = z.array(
  z.object({
    time: z.string(),
    windSpeedMin: z.number(),
    windSpeedMax: z.number(),
    windSpeedAvg: z.number(),
    windSpeedRange: z.tuple([z.number(), z.number()]),
  }),
);
export type WeatherForecastDailyWindSpeedChart = z.infer<
  typeof WeatherForecastDailyWindSpeedChartSchema
>;

export const WeatherForecastDailyAccumulationChartSchema = z.array(
  z.object({
    time: z.string(),
    rainAccumulationMin: z.number(),
    rainAccumulationMax: z.number(),
    rainAccumulationAvg: z.number(),
    rainAccumulationRange: z.tuple([z.number(), z.number()]),
    rainAccumulationSum: z.number(),
    sleetAccumulationMin: z.number(),
    sleetAccumulationMax: z.number(),
    sleetAccumulationAvg: z.number(),
    sleetAccumulationRange: z.tuple([z.number(), z.number()]),
    sleetAccumulationSum: z.number(),
    snowAccumulationMin: z.number(),
    snowAccumulationMax: z.number(),
    snowAccumulationAvg: z.number(),
    snowAccumulationRange: z.tuple([z.number(), z.number()]),
    snowAccumulationSum: z.number(),
    iceAccumulationMin: z.number(),
    iceAccumulationMax: z.number(),
    iceAccumulationAvg: z.number(),
    iceAccumulationRange: z.tuple([z.number(), z.number()]),
    iceAccumulationSum: z.number(),
  }),
);
export type WeatherForecastDailyAccumulationChart = z.infer<
  typeof WeatherForecastDailyAccumulationChartSchema
>;

export const WeatherForecastDailyChartsSchema = z.object({
  temperatures: WeatherForecastDailyTemperatureChartSchema,
  humidities: WeatherForecastDailyHumidityChartSchema,
  windSpeeds: WeatherForecastDailyWindSpeedChartSchema,
  precipitations: WeatherForecastDailyAccumulationChartSchema,
});
export type WeatherForecastDailyCharts = z.infer<
  typeof WeatherForecastDailyChartsSchema
>;

//
// Weather Code Map
//
export const WeatherCodeMapSchema = z.record(z.string());
export type WeatherCodeMap = z.infer<typeof WeatherCodeMapSchema>;
