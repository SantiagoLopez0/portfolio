import { Header }  from 'app/components/Shared/Header';
import { Footer } from "app/components/Shared/Footer";
import "./globals.css";

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ['latin'], weight: ["400", "600","800", "200", "100", "300"], });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
    </>
  );
}