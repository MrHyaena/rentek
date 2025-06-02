import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./_components/HeaderFooter/Header";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Providers from "./_providers/Providers";
import Footer from "./_components/HeaderFooter/Footer";
import Script from "next/script";

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
    template: "Grasston: %s",
    default: "Grasston: Půjčovna zahradní techniky",
  },
  description: "Půjčovna zahradní techniky",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
