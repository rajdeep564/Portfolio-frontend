import Navbar from "@/components/navbar";
import OnekoCat from "@/components/oneko-cat";
import StructuredData from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.seo.title,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.seo.description,
  keywords: [...DATA.seo.keywords],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DATA.seo.title,
    description: DATA.seo.description,
    url: "/",
    siteName: DATA.name,
    locale: "en_US",
    type: "profile",
    firstName: "Rajdeep Sinh",
    lastName: "Chavda",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: DATA.seo.title,
    description: DATA.seo.description,
    card: "summary_large_image",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    mochi: "welcome",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overflow-x-clip bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[40svh] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={3}
                gridGap={3}
                maxOpacity={0.55}
                color="#4a8c3a"
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
            <OnekoCat />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
