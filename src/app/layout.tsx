import "./globals.css";
import { Header }  from 'app/components/Header';

import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ['latin'], weight: ["400","800", "200"], });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <html lang="en">
      <Header />
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
    </>
  );
}