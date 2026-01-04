import { useState } from "react";
import { LocateFixed, Search } from "lucide-react";
import useWeatherStore from "../stores/weatherStore";
import getLocation from "../utils/GetLocation";

function SearchCity() {
    const [city, setCity] = useState("");
    const { setManualLocation, setGeoLocation, setLoading, setError } = useWeatherStore();

    const submitManual = () => {
        const trimmed = city.trim();
        if (!trimmed) return;
        setManualLocation(trimmed);
        setCity("");
    };

    const handleGeo = async () => {
        try {
            setLoading && setLoading(true);
            const { lat, lon } = await getLocation();
            setGeoLocation({ lat, lon });
        } catch (err) {
            setError && setError(err.message || "Failed to get location");
        } finally {
            setLoading && setLoading(false);
        }
    };

    return (
        <div className="flex items-center w-full gap-4">
            <div className="flex items-center flex-1 ring-zinc-500 ring-1 p-1 rounded-lg">
                <Search size={18} className="text-black mr-3" strokeWidth={2.5} />
                <input
                    type="text"
                    placeholder="Search for places..."
                    aria-label="Search for places"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitManual(); }}
                    className="w-full bg-transparent outline-none text-base font-medium placeholder:text-gray-400 text-black"
                />
            </div>

            {/* The circular 'Target' icon as seen in design */}
            <button
                type="button"
                aria-label="Use current location"
                title="Use current location"
                onClick={handleGeo}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#ddddde] text-gray-500 hover:text-black transition-colors"
            >
                <LocateFixed size={16} strokeWidth={2.5} />
            </button>
        </div>
    );
}

export default SearchCity