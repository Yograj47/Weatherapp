import useWeather from "../hooks/useWeather";
import useWeatherStore from "../stores/weatherStore";
import MainContent from "../components/MainContent"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react";

function Home() {
    const { location, setError } = useWeatherStore();

    console.log(import.meta.env.VITE_WEATHER_API_KEY)

    let cityOrCoords = null;

    if (location.type === "manual" && location.value.trim()) {
        cityOrCoords = location.value.trim();
    } else if (
        location.type === "geo" &&
        location.coords?.lat &&
        location.coords?.lon
    ) {
        cityOrCoords = location.coords;
    }

    useWeather(cityOrCoords);

    useEffect(() => {
        console.log("=== DEBUG INFO ===");
        console.log("Location:", location.value);
        console.log("cityOrCoords:", cityOrCoords);
        console.log("Weather data:", useWeatherStore.getState().weather);
        console.log("Forecast data:", useWeatherStore.getState().forecast);
        console.log("Loading:", useWeatherStore.getState().isLoading);
        console.log("Error:", useWeatherStore.getState().error);
    }, [location, cityOrCoords]);

    useEffect(() => {
        if (!cityOrCoords) {
            setError("Empty Field");
        }
    }, [cityOrCoords, setError]);

    return (
        <div className="h-screen w-full flex overflow-hidden font-sans antialiased">
            <aside className="w-[25%] xl:w-[20%] h-full bg-white p-4 border-r border-gray-200">
                <Sidebar />
            </aside>

            <main className="flex-1 h-full bg-[#F6F6F8] p-6">
                <MainContent />
            </main>
        </div>
    );
}

export default Home;