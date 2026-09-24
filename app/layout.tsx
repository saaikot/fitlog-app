import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog",
  description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col`}>
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </PlanProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}