import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "Consultas",
  description: "Aplicativo de Consultas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} flex flex-col min-h-screen gap-10`}>
        <Header />
        <div className="px-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
