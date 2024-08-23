import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceX API by Dark0",
  description: "Pagina que muestra la info del api de spacex de manera visual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="e">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
