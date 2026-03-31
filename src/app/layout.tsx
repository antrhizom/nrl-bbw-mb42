import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MerkblattProvider } from "@/context/MerkblattContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merkblatt NRL IKT | BBW Winterthur",
  description: "Interaktives Merkblatt zur Nutzungsrichtlinie IKT der BBW",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <MerkblattProvider>{children}</MerkblattProvider>
      </body>
    </html>
  );
}
