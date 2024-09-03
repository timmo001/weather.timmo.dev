import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { CloudSun } from "lucide-react";

import "~/styles/globals.css";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Header } from "~/components/header";
import { QueryProvider } from "~/components/providers/query";
import { LocationForm } from "~/app/_components/location-form";

export const metadata: Metadata = {
  title: "Weather",
  description: "TODO",
  keywords: ["weather"],
  icons: [{ rel: "icon", url: "/icon" }],
  metadataBase: new URL("https://weather.timmo.dev"),
  openGraph: {
    images: [
      {
        url: "/api/og",
      },
    ],
    siteName: "Weather",
    url: "https://weather.timmo.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${GeistSans.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-sky-500 to-white transition-all dark:from-sky-950 dark:to-black">
              <Header />
              <main
                className="container flex flex-col items-center justify-center gap-12 p-4"
                role="main"
              >
                <h1 className="flex select-none flex-row items-center gap-2 text-5xl font-extrabold tracking-tight delay-200 duration-300 animate-in fade-in sm:text-[5rem]">
                  <CloudSun className="h-16 w-16" />
                  Weather
                </h1>
                <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="text-2xl font-bold" size="lg">
                        Set Location
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full">
                      <DialogHeader>
                        <DialogTitle>Set Location</DialogTitle>
                        <DialogDescription>
                          Set your location to get the weather forecast
                        </DialogDescription>
                      </DialogHeader>
                      <LocationForm />
                    </DialogContent>
                  </Dialog>
                </section>

                {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
