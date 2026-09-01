import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono-plex" });

export const metadata: Metadata = {
  title: { default: "TenderHub — every tender and auction in Sri Lanka", template: "%s · TenderHub" },
  description:
    "Every government and private tender and auction notice in Sri Lanka, aggregated, categorised and searchable, with alerts that fire on your own saved profile.",
  metadataBase: new URL("https://tenderhub.lk"),
  openGraph: { siteName: "TenderHub", locale: "en_LK", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-density="comfortable" className={`${geist.variable} ${plex.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
