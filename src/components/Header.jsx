import { useEffect, useState } from "react";
// import usePreferences from "../stores/usePreferences";
import useWeatherStore from "../stores/weatherStore";

function Header() {
    // const { unit, setUnit, isDarkMode, toggleDark } = usePreferences();
    const { forecast } = useWeatherStore();
    const weatherIconApi = import.meta.env.VITE_WEATHER_API_ICON;
    console.log(weatherIconApi);
    

    const [forecastData, setForecastData] = useState([]);
    const [view, setView] = useState("week"); // UI toggle only

    useEffect(() => {
        if (!forecast?.list) return;

        const daily = [];

        // 5-day limit (API constraint)
        for (let i = 0; i < 5; i++) {
            const index = i * 8;
            const data = forecast.list[index];
            if (!data) continue;

            const date = new Date(data.dt * 1000);

            daily.push({
                day: date.toLocaleDateString("en-US", { weekday: "short" }),
                tempHigh: Math.round(data.main.temp_max),
                tempLow: Math.round(data.main.temp_min),
                icon: data.weather[0].icon,
            });
        }

        setForecastData(daily);
    }, [forecast]);

    return (
        <header className="w-full">
            {/* Top Controls */}
            <div className="mb-6 flex items-center justify-between">
                {/* View Toggle */}
                <div className="flex gap-6">
                    {["week", "today"].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`relative pb-2 text-xl font-bold transition ${view === v
                                ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.75 after:w-full after:rounded-full after:bg-black"
                                : "text-gray-300 hover:text-gray-500"
                                }`}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Right Controls */}
                {/* <div className="flex items-center gap-6"> */}
                    {/* Unit Toggle */}
                    {/* <div className="flex rounded-full bg-gray-100 p-1">
                        {["C", "F"].map((u) => (
                            <button
                                key={u}
                                onClick={() => setUnit(u)}
                                className={`h-9 w-9 rounded-full text-sm font-bold transition ${unit === u
                                    ? "bg-black text-white"
                                    : "text-gray-600 hover:text-black"
                                    }`}
                            >
                                °{u}
                            </button>
                        ))}
                    </div> */}

                    {/* Dark Mode Toggle */}
                    {/* <button
                        onClick={toggleDark}
                        className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${isDarkMode
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:text-black"
                            }`}
                    >
                        {isDarkMode ? "Dark" : "Light"}
                    </button>
                </div> */}
            </div>

            {/* Forecast Cards */}
            {view === "week" && (
                <div className="grid grid-cols-5 gap-4">
                    {forecastData.map((item, index) => (
                        <div
                            key={index}
                            className="flex min-h-40 cursor-pointer flex-col items-center justify-between rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <span className="text-sm font-bold uppercase tracking-wide text-gray-900">
                                {item.day}
                            </span>

                            <img
                                src={`${weatherIconApi}/${item.icon}@2x.png`}
                                alt="Weather icon"
                                className="h-12 w-12"
                            />

                            <div className="mt-2 flex gap-2 text-sm">
                                <span className="font-bold text-gray-900">
                                    {item.tempHigh}°
                                </span>
                                <span className="font-medium text-gray-300">
                                    {item.tempLow}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
}

export default Header;
