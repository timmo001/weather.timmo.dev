import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { CloudSun } from "lucide-react";

import "~/styles/globals.css";

import { Header } from "~/components/header";
import { CSPostHogProvider } from "~/components/providers/posthog";
import { QueryProvider } from "~/components/providers/query";
import { Location } from "~/components/location";

export const metadata: Metadata = {
  title: "Weather",
  description: "Get the weather forecast for your location.",
  keywords: ["weather"],
  icons: [{ rel: "icon", url: "/icon" }],
  metadataBase: new URL("https://weather.timmo.dev"),
  openGraph: {
    images: [
      {
        alt: "Weather",
        url: "/api/og",
      },
    ],
    siteName: "Weather",
    url: "https://weather.timmo.dev",
  },
};

// Create the root layout which wraps the entire app
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${GeistSans.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <CSPostHogProvider>
        <body>
          {/* Initialise the theme, default theme is the system theme. Can be toggled via the header */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {/* Wrap the app in the query provider */}
            <QueryProvider>
              <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-sky-500 to-white transition-all dark:from-sky-950 dark:to-black">
                <Header />
                <main
                  className="container flex flex-col items-center justify-center gap-8 px-4 pb-12 pt-4"
                  role="main"
                >
                  <h1 className="flex select-none flex-row items-center gap-2 text-6xl font-extrabold tracking-tight delay-200 duration-300 animate-in fade-in sm:text-[5rem]">
                    <CloudSun className="h-20 w-20" />
                    Weather
                  </h1>
                  <Location />
                  {children}
                </main>
              </div>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
