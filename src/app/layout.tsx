import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "../styles/index.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head ><title></title></head>

    <body className={`bg-[#FCFCFC] ${inter.className}`}>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  );
}
