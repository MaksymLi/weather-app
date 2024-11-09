export interface IBasicData{
  country: string,
  localtime: string,
  name: string,
  weather: string
  temp_c: number
}

export interface IBarometerData{
  pressure_mb: number,
  precip_mm: number,
  humidity: number
}

export interface IMoonPhaseData{
  moon_phase: string,
  sunrise: string,
  sunset: string,
  moonrise: string,
  moonset: string
}

export interface IForecastHourData{
  time: string[],
  weather: string[],
  temp_c: number[],
  wind_kph: number[]
}

export interface IForecastDayData{
  date: string[],
  weather: string[],
  avgtemp_c: number[],
  maxwind_kph: number[],
  daily_chance_of_rain: number[],
  uv: number[]
}