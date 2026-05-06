import { Header } from 'app/components/Shared/Header';
import { Footer } from "app/components/Shared/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Santiago López — Web Developer",
  description: "Web Developer specializing in Webflow, Next.js and frontend development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}