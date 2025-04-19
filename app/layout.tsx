import type { Metadata } from "next";
import "./globals.css";
import { AptabaseProvider } from '@aptabase/react';


export const metadata: Metadata = {
  title: "zapfolio ob theme",
  description: "create your portfolio website in two clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <AptabaseProvider appKey="A-EU-6485542438">{children}</AptabaseProvider>

      </body>
    </html>
  );
}
