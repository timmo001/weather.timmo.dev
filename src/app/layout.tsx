import { type Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { Header } from "~/components/header";
import { QueryProvider } from "~/components/providers/query";
import { LogoLocation } from "~/components/logo-location";

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
      <body>
        {/* Initialise the theme */}
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
                <LogoLocation />
                {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
        {/* Add analytics from vercel */}
        <Analytics />
      </body>
    </html>
  );
}
