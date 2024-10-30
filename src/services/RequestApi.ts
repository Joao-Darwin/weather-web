import api from "../api/api";
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
        temperature: response.temp_c,
        wind: response.wind_kph
    }
}

export default { getCurrentWeather }