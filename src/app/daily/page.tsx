import { type Metadata } from "next";

import { DailyCharts } from "~/app/daily/_components/daily-charts";

export const metadata: Metadata = {
  title: "Daily | Weather",
  description: "Get the daily weather forecast for your location.",
};

export default function DailyPage() {
  return (
    <>
      <section className="container flex max-w-screen-2xl flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Daily</h2>
        <DailyCharts />
      </section>
    </>
  );
}
