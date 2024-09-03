import { ForecastDaily } from "~/app/_components/forecast-daily";
import { ForecastHourly } from "~/app/_components/forecast-hourly";
import { ForecastNow } from "~/app/_components/forecast-now";

export default function TemperaturePage() {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Now</h2>
        <ForecastNow />
        <h2 className="mt-3 text-2xl font-bold">Forecast</h2>
        <ForecastHourly />
        <ForecastDaily />
      </section>
    </>
  );
}
