import { type Metadata } from "next";

import { TemperatureHourly } from "~/app/charts/_components/temperatureHourly";

export const metadata: Metadata = {
  title: "Temperature | Weather",
};

export default function TemperaturePage() {
  return (
    <>
      <section className="container flex max-w-screen-xl flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Charts</h2>
        <TemperatureHourly />
      </section>
    </>
  );
}
