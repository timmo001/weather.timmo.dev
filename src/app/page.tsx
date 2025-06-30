import { ForecastDaily } from "~/app/_components/forecast-daily";
import { ForecastHourly } from "~/app/_components/forecast-hourly";
import { ForecastNow } from "~/app/_components/forecast-now";

export default function HomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Current Weather Section */}
      <section className="flex w-full flex-col items-center gap-4 delay-300 duration-300 animate-in fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Current Weather</h2>
          <p className="text-muted-foreground">Live weather conditions for your location</p>
        </div>
        <ForecastNow />
      </section>

      {/* Forecasts Section */}
      <section className="flex w-full flex-col items-center gap-8 delay-500 duration-300 animate-in fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Weather Forecast</h2>
          <p className="text-muted-foreground">Detailed hourly and daily weather predictions</p>
        </div>
        
        <div className="w-full space-y-8">
          <ForecastHourly />
          <ForecastDaily />
        </div>
      </section>
    </div>
  );
}
