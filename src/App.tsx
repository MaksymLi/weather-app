import { CSSProperties, FC, useEffect, useState } from "react";
import { IBarometerData, IBasicData, IForecastDayData, IForecastHourData, IMoonPhaseData } from "./types/types";

const App: FC = () => {
  const API_KEY = '0cedd8f2df2d480f8bd72437240911'
  const [basicData, setBasicData] = useState<IBasicData | null>(null)
  const [barometerData, setBarometerData] = useState<IBarometerData | null>(null)
  const [moonPhaseData, setMoonPhaseData] = useState<IMoonPhaseData | null>(null)
  const [forecastHourData, setForecastHourData] = useState<IForecastHourData | null>(null)
  const [forecastDayData, setForecastDayData] = useState<IForecastDayData | null>(null)
  const [city, setCity] = useState<string>("Odessa")

  const [bgI, setBgI] = useState<string | null>(null)
  
  useEffect(() => {
    try{
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no`)
      .then(response => response.json())
      .then(dataAPI => sortData(dataAPI))
    }
    catch(e){
      console.log(e)
    }
  }, [])

  useEffect(() => {
    setBgI(selectBackground)
  })

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

  const selectBackground = ():string | null => {
    console.log(basicData?.weather)
    switch(basicData?.weather){
      case 'Sunny':
        return '../images/sunny.jpg'
      case 'Clear':
        return '../images/sunny.jpg'
      case 'Partly Cloudy':
        return '../images/cloudy.jpg'
      case 'Partly cloudy':
        return '../images/cloudy.jpg'
      case 'Cloudy':
        return '../images/cloudy.jpg'
      case 'Overcast':
        return '../images/cloudy.jpg'
      case 'Mist':
        return '../images/fog.jpg'
      case 'Patchy rain possible':
        return '../images/rainy.jpg'
      case 'Patchy snow possible':
        return '../images/snowy.jpg'
      case 'Patchy sleet possible':
        return '../images/rainy.jpg'
      case 'Patchy freezing drizzle possible':
        return '../images/rainy.jpg'
      case 'Thundery outbreaks possible':
        return '../images/thunderstorm.jpg'
      case 'Blowing snow':
        return '../images/snowy.jpg'
      case 'Blizzard':
        return '../images/snowy.jpg'
      case 'Fog':
        return '../images/fog.jpg'
      case 'Freezing fog':
        return '../images/fog.jpg'
      case 'Patchy light drizzle':
        return '../images/rainy.jpg'
      case 'Light drizzle':
        return '../images/rainy.jpg'
      case 'Freezing drizzle':
        return '../images/rainy.jpg'
      case 'Heavy freezing drizzle':
        return '../images/rainy.jpg'
      case 'Patchy light rain':
        return '../images/rainy.jpg'
      case 'Light rain':
        return '../images/rainy.jpg'
      case 'Moderate rain at times':
        return '../images/rainy.jpg'
      case 'Moderate rain':
        return '../images/rainy.jpg'
      case 'Heavy rain at times':
        return '../images/rainy.jpg'
      case 'Heavy rain':
        return '../images/rainy.jpg'
      case 'Light freezing rain':
        return '../images/rainy.jpg'
      case 'Moderate or heavy freezing rain':
        return '../images/rainy.jpg'
      case 'Light sleet':
        return '../images/snowy.jpg'
      case 'Moderate or heavy sleet':
        return '../images/snowy.jpg'
      case 'Patchy light snow':
        return '../images/snowy.jpg'
      case 'Light snow':
        return '../images/snowy.jpg'
      case 'Patchy moderate snow':
        return '../images/snowy.jpg'
      case 'Moderate snow':
        return '../images/snowy.jpg'
      case 'Patchy heavy snow':
        return '../images/snowy.jpg'
      case 'Heavy snow':
        return '../images/snowy.jpg'
      case 'Ice pellets':
        return '../images/rainy.jpg'
      case 'Light rain shower':
        return '../images/rainy.jpg'
      case 'Moderate or heavy rain shower':
        return '../images/rainy.jpg'
      case 'Torrential rain shower':
        return '../images/rainy.jpg'
      case 'Light sleet showers':
        return '../images/snowy.jpg'
      case 'Moderate or heavy sleet showers':
        return '../images/snowy.jpg'
      case 'Light snow showers':
        return '../images/snowy.jpg'
      case 'Moderate or heavy snow showers':
        return '../images/snowy.jpg'
      case 'Light showers of ice pellets':
        return '../images/snowy.jpg'
      case 'Moderate or heavy showers of ice pellets':
        return '../images/snowy.jpg'
      case 'Patchy light rain with thunder':
        return '../images/thunderstorm.jpg'
      case 'Moderate or heavy rain with thunder':
        return '../images/thunderstorm.jpg'
      case 'Patchy light snow with thunder':
        return '../images/thunderstorm.jpg'
      case 'Moderate or heavy snow with thunder':
        return '../images/thunderstorm.jpg'
      default:
        return null
    }
  }

  const divStyle: CSSProperties = {
    backgroundImage: `url(${bgI})`,
    width: `${window.visualViewport?.width}px`,
    height: `${window.visualViewport?.height}px`,
    filter: 'brightness(80%)',
    scale: 1,
    backgroundRepeat: 'no-repeat'
  }

  console.log(basicData)

  return (
    <div style={divStyle}>

    </div>
  )
}

export default App