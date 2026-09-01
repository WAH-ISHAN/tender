import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WebLoader from "@/components/layout/WebLoader";
import { ToastProvider } from "@/components/ui/Toaster";
import { LanguageProvider } from "@/context/LanguageContext";

const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TenderHub Sri Lanka — National Procurement & Tender Network",
  description: "Sri Lanka's centralized commercial and state procurement gateway. Aggregating national gazettes, government ministries, and verified corporate RFPs daily.",
  metadataBase: new URL("https://tenderhub.lk"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0055B8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-white text-[#111827]">
        <ToastProvider>
          <LanguageProvider>
            <WebLoader />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
