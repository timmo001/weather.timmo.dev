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
  cloudBase: z.number().optional(),
  cloudCeiling: z.number().optional(),
  cloudCover: z.number().optional(),
  dewPoint: z.number().optional(),
  freezingRainIntensity: z.number().optional(),
  humidity: z.number().optional(),
  precipitationIntensity: z.number().optional(),
  precipitationProbability: z.number().optional(),
  precipitationType: z.number().optional(),
  pressureSurfaceLevel: z.number().optional(),
  rainIntensity: z.number().optional(),
  sleetIntensity: z.number().optional(),
  snowIntensity: z.number().optional(),
  temperature: z.number().optional(),
  temperatureApparent: z.number().optional(),
  uvHealthConcern: z.number().optional(),
  uvIndex: z.number().optional(),
  visibility: z.number().optional(),
  weatherCode: z.number().optional(),
  windDirection: z.number().optional(),
  windGust: z.number().optional(),
  windSpeed: z.number().optional(),
  // Hourly
  evapotranspiration: z.number().optional(),
  iceAccumulation: z.number().optional(),
  rainAccumulation: z.number().optional(),
  sleetAccumulation: z.number().optional(),
  snowAccumulation: z.number().optional(),
  // Daily
  cloudBaseAvg: z.number().optional(),
  cloudBaseMax: z.number().optional(),
  cloudBaseMin: z.number().optional(),
  cloudCeilingAvg: z.number().optional(),
  cloudCeilingMax: z.number().optional(),
  cloudCeilingMin: z.number().optional(),
  cloudCoverAvg: z.number().optional(),
  cloudCoverMax: z.number().optional(),
  cloudCoverMin: z.number().optional(),
  dewPointAvg: z.number().optional(),
  dewPointMax: z.number().optional(),
  dewPointMin: z.number().optional(),
  evapotranspirationAvg: z.number().optional(),
  evapotranspirationMax: z.number().optional(),
  evapotranspirationMin: z.number().optional(),
  evapotranspirationSum: z.number().optional(),
  freezingRainIntensityAvg: z.number().optional(),
  freezingRainIntensityMax: z.number().optional(),
  freezingRainIntensityMin: z.number().optional(),
  humidityAvg: z.number().optional(),
  humidityMax: z.number().optional(),
  humidityMin: z.number().optional(),
  iceAccumulationAvg: z.number().optional(),
  iceAccumulationMax: z.number().optional(),
  iceAccumulationMin: z.number().optional(),
  iceAccumulationSum: z.number().optional(),
  moonriseTime: z.string().optional(),
  moonsetTime: z.string().optional(),
  precipitationProbabilityAvg: z.number().optional(),
  precipitationProbabilityMax: z.number().optional(),
  precipitationProbabilityMin: z.number().optional(),
  pressureSurfaceLevelAvg: z.number().optional(),
  pressureSurfaceLevelMax: z.number().optional(),
  pressureSurfaceLevelMin: z.number().optional(),
  rainAccumulationAvg: z.number().optional(),
  rainAccumulationMax: z.number().optional(),
  rainAccumulationMin: z.number().optional(),
  rainAccumulationSum: z.number().optional(),
  rainIntensityAvg: z.number().optional(),
  rainIntensityMax: z.number().optional(),
  rainIntensityMin: z.number().optional(),
  sleetAccumulationAvg: z.number().optional(),
  sleetAccumulationMax: z.number().optional(),
  sleetAccumulationMin: z.number().optional(),
  // sleetAccumulationSum: z.number().optional(),
  sleetIntensityAvg: z.number().optional(),
  sleetIntensityMax: z.number().optional(),
  sleetIntensityMin: z.number().optional(),
  snowAccumulationAvg: z.number().optional(),
  snowAccumulationMax: z.number().optional(),
  snowAccumulationMin: z.number().optional(),
  snowAccumulationSum: z.number().optional(),
  snowIntensityAvg: z.number().optional(),
  snowIntensityMax: z.number().optional(),
  snowIntensityMin: z.number().optional(),
  sunriseTime: z.string().optional(),
  sunsetTime: z.string().optional(),
  temperatureApparentAvg: z.number().optional(),
  temperatureApparentMax: z.number().optional(),
  temperatureApparentMin: z.number().optional(),
  temperatureAvg: z.number().optional(),
  temperatureMax: z.number().optional(),
  temperatureMin: z.number().optional(),
  uvHealthConcernAvg: z.number().optional(),
  uvHealthConcernMax: z.number().optional(),
  uvHealthConcernMin: z.number().optional(),
  uvIndexAvg: z.number().optional(),
  uvIndexMax: z.number().optional(),
  uvIndexMin: z.number().optional(),
  visibilityAvg: z.number().optional(),
  visibilityMax: z.number().optional(),
  visibilityMin: z.number().optional(),
  weatherCodeMax: z.number().optional(),
  weatherCodeMin: z.number().optional(),
  windDirectionAvg: z.number().optional(),
  windGustAvg: z.number().optional(),
  windGustMax: z.number().optional(),
  windGustMin: z.number().optional(),
  windSpeedAvg: z.number().optional(),
  windSpeedMax: z.number().optional(),
  windSpeedMin: z.number().optional(),
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
  values: ValuesSchema,
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
  timestep: z.string(),
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
