import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Temperature | Weather",
};

export default function TemperaturePage() {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <h2 className="text-2xl font-bold">Temperature</h2>
        <p>Coming soon...</p>
      </section>
    </>
  );
}
