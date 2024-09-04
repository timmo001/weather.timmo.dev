import { type Metadata } from "next";

import { DailyCharts } from "~/app/daily/_components/dailyCharts";

export const metadata: Metadata = {
  title: "Daily | Weather",
};

export default function DailyPage() {
  return (
    <>
      <section className="container flex max-w-screen-xl flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Daily</h2>
        <DailyCharts />
      </section>
    </>
  );
}
