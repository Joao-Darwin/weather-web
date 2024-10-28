import Forecast from "./Forecast";

interface Weather {
    description: string,
    temperature: string,
    wind: string,
    forecast: Forecast[]
}

export default Weather;