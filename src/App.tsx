import { FC, useEffect, useState } from "react";
import { IBarometerData, IBasicData, IForecastDayData, IForecastHourData, IMoonPhaseData } from "./types/types";

const App: FC = () => {
  const API_KEY = '0cedd8f2df2d480f8bd72437240911'
  const [basicData, setBasicData] = useState<IBasicData | null>(null);
  const [barometerData, setBarometerData] = useState<IBarometerData | null>(null);
  const [moonPhaseData, setMoonPhaseData] = useState<IMoonPhaseData | null>(null);
  const [forecastHourData, setForecastHourData] = useState<IForecastHourData | null>(null);
  const [forecastDayData, setForecastDayData] = useState<IForecastDayData | null>(null);
  const [city, setCity] = useState<string>("Torun")
  
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`)
    .then(response => response.json())
    .then(dataAPI => sortData(dataAPI))
  }, [])

  
  const sortData = (dataAPI: any): void => {
    setBasicData({
      country: dataAPI.location.country,
      localtime: dataAPI.location.localtime,
      name: dataAPI.location.name,
      weather: dataAPI.current.condition.text,
      temp_c: dataAPI.current.temp_c
    })
    setBarometerData({
      humidity: dataAPI.current.humidity,
      precip_mm: dataAPI.current.precip_mm,
      pressure_mb: dataAPI.current.pressure_mb
    })
    setMoonPhaseData({
      moon_phase: dataAPI.forecast.forecastday[0].astro.moon_phase,
      moonrise: dataAPI.forecast.forecastday[0].astro.moonrise,
      moonset: dataAPI.forecast.forecastday[0].astro.moonset,
      sunrise: dataAPI.forecast.forecastday[0].astro.sunrise,
      sunset: dataAPI.forecast.forecastday[0].astro.sunset
    })
    setForecastHourData({
      temp_c: dataAPI.forecast.forecastday[0].hour.map((h: any) => {
        return h.temp_c
      }),
      time: dataAPI.forecast.forecastday[0].hour.map((h: any) => {
        return h.time.slice(-5)
      }),
      weather: dataAPI.forecast.forecastday[0].hour.map((h: any) => {
        return h.condition.text
      }),
      wind_kph: dataAPI.forecast.forecastday[0].hour.map((h: any) => {
        return h.wind_kph
      }),
    })
    setForecastDayData({
      date: dataAPI.forecast.forecastday.map((d: any) => {
        return d.date
      }),
      weather: dataAPI.forecast.forecastday.map((d: any) => {
        return d.day.condition.text
      }),
      avgtemp_c: dataAPI.forecast.forecastday.map((d: any) => {
        return d.day.avgtemp_c
      }),
      maxwind_kph: dataAPI.forecast.forecastday.map((d: any) => {
        return d.day.maxwind_kph
      }),
      daily_chance_of_rain: dataAPI.forecast.forecastday.map((d: any) => {
        return d.day.daily_chance_of_rain
      }),
      uv: dataAPI.forecast.forecastday.map((d: any) => {
        return d.day.uv
      })
    })
  }

  console.log(basicData)
  console.log(barometerData)
  console.log(moonPhaseData)
  console.log(forecastHourData)
  console.log(forecastDayData)

  return (
    <>
      
    </>
  )
}

export default App