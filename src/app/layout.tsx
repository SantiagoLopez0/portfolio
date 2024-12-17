import "./globals.css";
import { Header }  from 'app/components/Header';

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ['latin'], weight: ["400", "600","800", "200", "100"], });

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
      </body>
    </html>
    </>
  );
}