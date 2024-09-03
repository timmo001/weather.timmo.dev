import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { Header } from "~/components/header";
import { QueryProvider } from "~/components/providers/query";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-sky-500 to-white dark:from-sky-950 dark:to-black">
              <Header />
              {children}
            </main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
