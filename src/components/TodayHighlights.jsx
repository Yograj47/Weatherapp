import { Wind, Sunrise, Sunset } from "lucide-react";
import useWeatherStore from "../stores/weatherStore";

export default function TodayHighlights() {
    const { forecast } = useWeatherStore();

    if (!forecast?.list?.length) return null;

    const current = forecast.list[0];

    /* ---------------- UV INDEX (estimated) ---------------- */
    const cloud = current.clouds.all; // %
    let uvIndex = Math.max(1, Math.round((100 - cloud) / 20));
    uvIndex = Math.min(11, uvIndex);

    /* ---------------- WIND ---------------- */
    const windSpeed = (current.wind.speed * 3.6).toFixed(2); // m/s → km/h
    const windDeg = current.wind.deg;

    const windDir = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
        Math.round(windDeg / 45) % 8
    ];

    /* ---------------- SUNRISE / SUNSET ---------------- */
    const sunrise = new Date(forecast.city.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const sunset = new Date(forecast.city.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    /* ---------------- HUMIDITY ---------------- */
    const humidity = current.main.humidity;

    /* ---------------- VISIBILITY ---------------- */
    const visibilityKm = (current.visibility / 1000).toFixed(1);

    /* ---------------- AQI (estimated) ---------------- */
    let aqi = 50;

    if (humidity > 80) aqi += 30;
    if (visibilityKm < 5) aqi += 30;
    if (current.wind.speed < 2) aqi += 20;

    aqi = Math.min(200, aqi);

    const aqiLevel =
        aqi <= 50 ? "Good 👍🏻" :
            aqi <= 100 ? "Moderate 😐" :
                "Unhealthy 👎🏻";

    const aqiBar = Math.min(100, (aqi / 200) * 100);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Today's Highlights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* UV Index */}
                <HighlightCard title="UV Index">
                    <div className="relative h-24 w-full flex items-end justify-center overflow-hidden">
                        <div className="absolute w-40 h-40 border-12 border-gray-100 rounded-full top-4" />
                        <div
                            className="absolute w-40 h-40 border-12 border-yellow-400 rounded-full top-4 border-b-transparent border-l-transparent"
                            style={{ transform: `rotate(${uvIndex * 12}deg)` }}
                        />
                        <span className="text-4xl font-bold mb-2">{uvIndex}</span>
                    </div>
                </HighlightCard>

                {/* Wind */}
                <HighlightCard title="Wind Status">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold">{windSpeed}</span>
                            <span className="text-xl text-gray-400">km/h</span>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="p-2 rounded-full border border-gray-100">
                                <Wind size={16} className="text-blue-500" />
                            </div>
                            <span className="text-sm font-medium">{windDir}</span>
                        </div>
                    </div>
                </HighlightCard>

                {/* Sunrise & Sunset */}
                <HighlightCard title="Sunrise & Sunset">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-yellow-100">
                                <Sunrise className="text-yellow-600" size={20} />
                            </div>
                            <p className="text-xl font-bold">{sunrise}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-yellow-100">
                                <Sunset className="text-yellow-600" size={20} />
                            </div>
                            <p className="text-xl font-bold">{sunset}</p>
                        </div>
                    </div>
                </HighlightCard>

                {/* Humidity */}
                <HighlightCard title="Humidity">
                    <div className="flex justify-between items-center h-full">
                        <span className="text-5xl font-semibold">
                            {humidity}
                            <span className="text-2xl font-normal">%</span>
                        </span>
                        <div className="h-20 w-6 bg-gray-100 rounded-full relative overflow-hidden">
                            <div
                                className="absolute bottom-0 w-full bg-blue-500 rounded-full"
                                style={{ height: `${humidity}%` }}
                            />
                        </div>
                    </div>
                    <p className="text-sm mt-2 font-medium">
                        {humidity > 70 ? "High 💧" : "Normal 👍🏻"}
                    </p>
                </HighlightCard>

                {/* Visibility */}
                <HighlightCard title="Visibility">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-semibold">{visibilityKm}</span>
                            <span className="text-xl text-gray-400">km</span>
                        </div>
                        <p className="text-sm mt-6 text-gray-400 font-medium">
                            {visibilityKm < 5 ? "Poor 😷" : "Good 👀"}
                        </p>
                    </div>
                </HighlightCard>

                {/* Air Quality */}
                <HighlightCard title="Air Quality">
                    <div className="flex justify-between items-center h-full">
                        <span className="text-5xl font-semibold">{aqi}</span>
                        <div className="h-20 w-6 bg-gray-100 rounded-full relative overflow-hidden">
                            <div
                                className="absolute bottom-0 w-full bg-orange-400 rounded-full"
                                style={{ height: `${aqiBar}%` }}
                            />
                        </div>
                    </div>
                    <p className="text-sm mt-2 font-medium">{aqiLevel}</p>
                </HighlightCard>

            </div>
        </div>
    );
}

function HighlightCard({ title, children }) {
    return (
        <div className="bg-white p-6  rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-transparent hover:border-gray-100 transition-all flex flex-col justify-between h-45">
            <h3 className="text-gray-400 font-medium text-sm mb-2">{title}</h3>
            <div className="flex-1 flex flex-col justify-center">{children}</div>
        </div>
    );
}
