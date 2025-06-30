import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { CloudSun } from "lucide-react";

import "~/styles/globals.css";

import { Header } from "~/components/header";
import { CSPostHogProvider } from "~/components/providers/posthog";
import { QueryProvider } from "~/components/providers/query";

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
        <body className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 dark:from-sky-900 dark:via-sky-950 dark:to-slate-900">
          {/* Initialise the theme, default theme is the system theme. Can be toggled via the header */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {/* Wrap the app in the query provider */}
            <QueryProvider>
              <div className="relative min-h-screen">
                {/* Background overlay for better content readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none" />
                
                <div className="relative z-10 flex min-h-screen flex-col">
                  <Header />
                  
                  <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12 space-y-4">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <CloudSun className="h-16 w-16 text-foreground drop-shadow-sm" />
                        <h1 className="text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm sm:text-6xl lg:text-7xl">
                          Weather
                        </h1>
                      </div>
                      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get accurate weather forecasts and real-time conditions for any location around the world.
                      </p>
                    </div>
                    
                    {/* Main Content */}
                    <div className="w-full max-w-7xl">
                      {children}
                    </div>
                  </main>
                  
                  {/* Footer */}
                  <footer className="border-t border-border/40 bg-background/80 backdrop-blur-md">
                    <div className="container py-6 px-4">
                      <div className="text-center text-sm text-muted-foreground">
                        <p>© 2024 Weather App. Built with Next.js and powered by Tomorrow.io</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
