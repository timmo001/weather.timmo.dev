import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "~/styles/globals.css";

import { Header } from "~/components/header";

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
    siteName: "Notes",
    url: "https://weather.timmo.dev",
  },
};

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-sky-500 to-white dark:from-sky-950 dark:to-black">
              <Header />
              {children}
            </main>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
