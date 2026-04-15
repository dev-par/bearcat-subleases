import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-dvh">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
