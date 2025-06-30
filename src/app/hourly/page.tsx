import { type Metadata } from "next";

import { HourlyCharts } from "~/app/hourly/_components/hourly-charts";

export const metadata: Metadata = {
  title: "Hourly | Weather",
  description: "Get the hourly weather forecast for your location.",
};

export default function HourlyPage() {
  return (
    <>
      <section className="animate-in fade-in container flex max-w-(--breakpoint-2xl) flex-col items-center gap-3 delay-300 duration-300">
        <h2 className="text-2xl font-bold">Hourly</h2>
        <HourlyCharts />
      </section>
    </>
  );
}
