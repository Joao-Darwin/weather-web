import Forecast from "./Forecast"

interface CompleteWeather {
    location: {
        name: string,
        region: string,
        country: string
    },
    current: {
        condition: string,
        temperature: string,
        feelslike: string,
        wind_kph: string,
        wind_dir: string,
        humidity: string,
        maxtemp: string,
        mintemp: string
    },
    forecast: Forecast[]
}

export default CompleteWeather;