import api from "../api/api";
import CompleteWeather from "../interfaces/CompleteWeather";
import Weather from "../interfaces/Weather";

const getCurrentWeather = async (city: string): Promise<Weather> => {
    const response = (await api.request({
        params: {
            q: city,
            key: import.meta.env.VITE_API_KEY
        },
        method: "GET",
        url: "/current.json"
    })).data.current;

    return {
        description: response.condition.text,
        temperature: Number.parseFloat(response.temp_c).toFixed(1).toString(),
        wind:Number.parseFloat(response.wind_kph).toFixed(1).toString()
    }
}

const getCurrentWeatherWithForecats = async (city: string): Promise<CompleteWeather> => {
    const response = await (await api.request({
        params: {
            q: city,
            key: import.meta.env.VITE_API_KEY,
            days: 3
        },
        method: "GET",
        url: "/forecast.json"
    })).data

    const weather: CompleteWeather = {
        location: {
            name: response.location.name,
            region: response.location.region,
            country: response.location.country
        },
        current: {
            condition: response.current.condition.text,
            temperature: response.current.temp_c.toString(),
            feelslike: response.current.feelslike_c.toString(),
            wind_kph: response.current.wind_kph.toString(),
            wind_dir: response.current.wind_dir,
            humidity: response.current.humidity.toString(),
            maxtemp: response.forecast.forecastday[0].day.maxtemp_c.toString(),
            mintemp: response.forecast.forecastday[0].day.mintemp_c.toString()
        },
        forecast: response.forecast.forecastday.map((day: any) => ({
            date: day.date,
            maxtemp: day.day.maxtemp_c.toString(),
            mintemp: day.day.mintemp_c.toString()
        }))
    };

    return weather;
}

export default { getCurrentWeather, getCurrentWeatherWithForecats }