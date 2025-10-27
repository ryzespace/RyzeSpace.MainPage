// app/layout.tsx
import "../styles/index.css";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
    <body className={`bg-[#FCFCFC] dark:bg-dark ${inter.className}`}>{children}</body>
    </html>
  );
}