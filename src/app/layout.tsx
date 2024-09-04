import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { Header } from "~/components/header";
import { QueryProvider } from "~/components/providers/query";
import { LogoLocation } from "~/app/_components/logo-location";

export const metadata: Metadata = {
  title: "Weather",
  description: "A weather application",
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
                className="container mb-4 flex flex-col items-center justify-center gap-12 p-4"
                role="main"
              >
                <LogoLocation />
                {children}
              </main>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
