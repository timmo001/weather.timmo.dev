import { z } from "zod";

//
// Error
//
export const WeatherForecastErrorResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});
export type WeatherForecastErrorResponse = z.infer<
  typeof WeatherForecastErrorResponseSchema
>;

//
// Timelines
//
export const ValuesSchema = z.object({
  // Now
  cloudBase: z.number().nullish(),
  cloudCeiling: z.number().nullish(),
  cloudCover: z.number().nullish(),
  dewPoint: z.number().nullish(),
  freezingRainIntensity: z.number().nullish(),
  humidity: z.number().nullish(),
  precipitationIntensity: z.number().nullish(),
  precipitationProbability: z.number().nullish(),
  precipitationType: z.number().nullish(),
  pressureSurfaceLevel: z.number().nullish(),
  rainIntensity: z.number().nullish(),
  sleetIntensity: z.number().nullish(),
  snowIntensity: z.number().nullish(),
  temperature: z.number().nullish(),
  temperatureApparent: z.number().nullish(),
  uvHealthConcern: z.number().nullish(),
  uvIndex: z.number().nullish(),
  visibility: z.number().nullish(),
  weatherCode: z.number().nullish(),
  windDirection: z.number().nullish(),
  windGust: z.number().nullish(),
  windSpeed: z.number().nullish(),
  // Hourly
  evapotranspiration: z.number().nullish(),
  iceAccumulation: z.number().nullish(),
  rainAccumulation: z.number().nullish(),
  sleetAccumulation: z.number().nullish(),
  snowAccumulation: z.number().nullish(),
  // Daily
  cloudBaseAvg: z.number().nullish(),
  cloudBaseMax: z.number().nullish(),
  cloudBaseMin: z.number().nullish(),
  cloudCeilingAvg: z.number().nullish(),
  cloudCeilingMax: z.number().nullish(),
  cloudCeilingMin: z.number().nullish(),
  cloudCoverAvg: z.number().nullish(),
  cloudCoverMax: z.number().nullish(),
  cloudCoverMin: z.number().nullish(),
  dewPointAvg: z.number().nullish(),
  dewPointMax: z.number().nullish(),
  dewPointMin: z.number().nullish(),
  evapotranspirationAvg: z.number().nullish(),
  evapotranspirationMax: z.number().nullish(),
  evapotranspirationMin: z.number().nullish(),
  evapotranspirationSum: z.number().nullish(),
  freezingRainIntensityAvg: z.number().nullish(),
  freezingRainIntensityMax: z.number().nullish(),
  freezingRainIntensityMin: z.number().nullish(),
  humidityAvg: z.number().nullish(),
  humidityMax: z.number().nullish(),
  humidityMin: z.number().nullish(),
  iceAccumulationAvg: z.number().nullish(),
  iceAccumulationMax: z.number().nullish(),
  iceAccumulationMin: z.number().nullish(),
  iceAccumulationSum: z.number().nullish(),
  moonriseTime: z.string().nullish(),
  moonsetTime: z.string().nullish(),
  precipitationProbabilityAvg: z.number().nullish(),
  precipitationProbabilityMax: z.number().nullish(),
  precipitationProbabilityMin: z.number().nullish(),
  pressureSurfaceLevelAvg: z.number().nullish(),
  pressureSurfaceLevelMax: z.number().nullish(),
  pressureSurfaceLevelMin: z.number().nullish(),
  rainAccumulationAvg: z.number().nullish(),
  rainAccumulationMax: z.number().nullish(),
  rainAccumulationMin: z.number().nullish(),
  rainAccumulationSum: z.number().nullish(),
  rainIntensityAvg: z.number().nullish(),
  rainIntensityMax: z.number().nullish(),
  rainIntensityMin: z.number().nullish(),
  sleetAccumulationAvg: z.number().nullish(),
  sleetAccumulationMax: z.number().nullish(),
  sleetAccumulationMin: z.number().nullish(),
  sleetAccumulationSum: z.number().nullish(),
  sleetIntensityAvg: z.number().nullish(),
  sleetIntensityMax: z.number().nullish(),
  sleetIntensityMin: z.number().nullish(),
  snowAccumulationAvg: z.number().nullish(),
  snowAccumulationMax: z.number().nullish(),
  snowAccumulationMin: z.number().nullish(),
  snowAccumulationSum: z.number().nullish(),
  snowIntensityAvg: z.number().nullish(),
  snowIntensityMax: z.number().nullish(),
  snowIntensityMin: z.number().nullish(),
  sunriseTime: z.string().nullish(),
  sunsetTime: z.string().nullish(),
  temperatureApparentAvg: z.number().nullish(),
  temperatureApparentMax: z.number().nullish(),
  temperatureApparentMin: z.number().nullish(),
  temperatureAvg: z.number().nullish(),
  temperatureMax: z.number().nullish(),
  temperatureMin: z.number().nullish(),
  uvHealthConcernAvg: z.number().nullish(),
  uvHealthConcernMax: z.number().nullish(),
  uvHealthConcernMin: z.number().nullish(),
  uvIndexAvg: z.number().nullish(),
  uvIndexMax: z.number().nullish(),
  uvIndexMin: z.number().nullish(),
  visibilityAvg: z.number().nullish(),
  visibilityMax: z.number().nullish(),
  visibilityMin: z.number().nullish(),
  weatherCodeMax: z.number().nullish(),
  weatherCodeMin: z.number().nullish(),
  windDirectionAvg: z.number().nullish(),
  windGustAvg: z.number().nullish(),
  windGustMax: z.number().nullish(),
  windGustMin: z.number().nullish(),
  windSpeedAvg: z.number().nullish(),
  windSpeedMax: z.number().nullish(),
  windSpeedMin: z.number().nullish(),
});
export type Values = z.infer<typeof ValuesSchema>;

export const MetaSchema = z.object({
  from: z.string(),
  to: z.string(),
  timestep: z.string(),
});
export type Meta = z.infer<typeof MetaSchema>;

export const IntervalSchema = z.object({
  startTime: z.coerce.string(),
  values: ValuesSchema.nullish(),
});
export type Interval = z.infer<typeof IntervalSchema>;

export const WarningSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
  meta: MetaSchema,
});
export type Warning = z.infer<typeof WarningSchema>;

export const TimelineElementSchema = z.object({
  timestep: z.enum(["current", "1h", "1d"]),
  endTime: z.coerce.string(),
  startTime: z.coerce.string(),
  intervals: z.array(IntervalSchema),
});
export type TimelineElement = z.infer<typeof TimelineElementSchema>;

export const DataSchema = z.object({
  timelines: z.array(TimelineElementSchema),
  warnings: z.array(WarningSchema),
});
export type Data = z.infer<typeof DataSchema>;

export const TimelinesSchema = z.object({
  data: DataSchema,
});
export type Timelines = z.infer<typeof TimelinesSchema>;
