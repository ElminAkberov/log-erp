import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { AppProviders } from "./providers/AppProviders";

const figtreeSans = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "166 Logistics ERP",
  description: "Manage all your logistics operations on a single platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtreeSans.className} bg-black`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
