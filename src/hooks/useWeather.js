import { useEffect, useCallback } from "react";
import useWeatherStore from "../stores/weatherStore";

let BASE_URL;
let API_KEY;
try {
    BASE_URL = import.meta && import.meta.env && import.meta.env.VITE_BASE_URL;
    API_KEY = import.meta && import.meta.env && import.meta.env.VITE_WEATHER_API_KEY;
} catch (e) {
    BASE_URL = undefined;
    API_KEY = undefined;
}

BASE_URL = BASE_URL || "https://api.openweathermap.org/data/2.5/";
API_KEY = API_KEY || "f833153334104dffb8c6d30078a22b6c";

if (!API_KEY) {
    // Helpful runtime warning for missing key
    // eslint-disable-next-line no-console
    console.warn("VITE_WEATHER_API_KEY is not set. OpenWeather requests will be unauthorized.");
}

export default function useWeather(query) {
    const { setWeather, setForecast, setLoading, setError } = useWeatherStore();

    const fetchWeather = useCallback(async () => {
        if (!query) return;

        setLoading && setLoading(true);
        setError && setError(null);

        try {
            const q = typeof query === "string"
                ? `q=${encodeURIComponent(query)}`
                : `lat=${query.lat}&lon=${query.lon}`;

            const [weatherRes, forecastRes] = await Promise.all([
                fetch(`${BASE_URL}weather?${q}&appid=${API_KEY}&units=metric`),
                fetch(`${BASE_URL}forecast?${q}&appid=${API_KEY}&units=metric`),
            ]);

            const weatherData = await weatherRes.json();
            const forecastData = await forecastRes.json();

            if (weatherData.cod && weatherData.cod !== 200) throw new Error(weatherData.message || "Weather fetch error");

            setWeather && setWeather(weatherData);
            setForecast && setForecast(forecastData);
        } catch (err) {
            setError && setError(err.message || "Failed to fetch weather");
        } finally {
            setLoading && setLoading(false);
        }
    }, [query, setWeather, setForecast, setLoading, setError]);

    useEffect(() => {
        fetchWeather();
    }, [fetchWeather]);
}
