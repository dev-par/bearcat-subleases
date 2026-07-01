import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import { Toaster } from "@/components/ui/toast";

export const viewport = {
  viewportFit: "cover",
};

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
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
