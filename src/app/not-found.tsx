import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-96 flex-col items-center justify-start">
      <section className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-center text-2xl font-light">404: Page not found</h2>
        <Link href="/">
          <button className="">Return Home</button>
        </Link>
      </section>
    </main>
  );
}
