import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bearcat Subleasing",
    template: "%s | Bearcat Subleasing",
  },
  description:
    "A Cincinnati student marketplace for verified subleases, trustworthy listing details, and faster apartment browsing near campus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
