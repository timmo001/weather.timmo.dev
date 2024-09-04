import { type Metadata } from "next";

import { HourlyCharts } from "~/app/hourly/_components/hourlyCharts";

export const metadata: Metadata = {
  title: "Hourly | Weather",
};

export default function HourlyPage() {
  return (
    <>
      <section className="container flex max-w-screen-xl flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Hourly</h2>
        <HourlyCharts />
      </section>
    </>
  );
}