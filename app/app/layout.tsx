import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./_components/HeaderFooter/_components/Header";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./_providers/Providers";
import Footer from "./_components/HeaderFooter/_components/Footer";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Rentek: %s",
    default: "Rentek: Půjčovna zahradní techniky",
  },
  description:
    "Půjčovna zahradní techniky. Kvalitní sekačky, vertikulátory a další nářadí k zapůjčení. Rychlá online rezervace, výhodné ceny, dovoz po Praze a okolí zdarma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="0db73977-b2f2-4fda-a24e-2a08bdee8b21"
        type="text/javascript"
      ></Script>
      <GoogleTagManager gtmId="GTM-PN98TZ43" />
      <body className={`${montserrat.className} antialiased`}>
        <Providers>
          <Header />
          <div className="md:mt-[150px] mt-[80px] text-textPrimary z-19">
            {children}
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
