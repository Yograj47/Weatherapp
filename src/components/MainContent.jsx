import Header from "./Header"
import TodayHighlights from "./TodayHighlights"

function MainContent() {
    return (
        /* 1. Changed bg-zinc-300 to a softer #F6F6F8.
           2. Increased padding to p-10 to give the elements room to breathe.
           3. Added overflow-y-auto to ensure it scrolls if the screen is short.
        */
        <div className="w-full h-full flex flex-col">

            {/* Top Section: Navigation + Weekly Forecast */}
            <section>
                <Header />
            </section>

            {/* Bottom Section: Grid of Widgets (UV, Humidity, etc.) */}
            <section className="flex-1">
                <TodayHighlights />
            </section>

        </div>
    );
}

export default MainContent;