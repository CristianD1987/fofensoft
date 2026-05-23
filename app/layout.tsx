import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
});

const siteTitle = "FOFENSOFT — Web & Mobile Software Development";
const siteDescription =
  "FOFENSOFT S.R.L. is a Romanian software studio building modern web and mobile applications. Based in Bucharest, Romania.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL("https://fofensoft.com"),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "FOFENSOFT",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="min-h-screen font-sans antialiased">
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
