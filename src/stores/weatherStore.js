import { create } from "zustand";
import { persist } from "zustand/middleware";

const weatherStore = (set) => ({
    weather: null,
    forecast: null,
    isLoading: false,
    error: null,
    location: { type: "manual", value: "London", coords: null },

    setManualLocation: (city) =>
        set(() => ({
            location: { type: "manual", value: city, coords: null },
        })),

    setGeoLocation: ({ lat, lon }) =>
        set(() => ({
            location: { type: "geo", value: "", coords: { lat, lon } },
        })),
    setLocation: (name) =>
        set((state) => ({
            location: { ...state, value: name },
        })),

    setWeather: (data) => set(() => ({ weather: data })),
    setForecast: (data) => set(() => ({ forecast: data })),
    setLoading: (bool) => set(() => ({ isLoading: bool })),
    setError: (err) => set(() => ({ error: err })),


    reset: () =>
        set(() => ({
            location: { type: "manual", value: "", coords: null },
            weather: null,
            forecast: null
        })),

});

const useWeatherStore = create(
    persist(weatherStore, { name: "location-storage" })
);

export default useWeatherStore;
