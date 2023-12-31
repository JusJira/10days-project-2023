import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Home, ShoppingCart, UserCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ChadMart - Market for GigaChad's",
  description:
    "All-in-one market for everyone not only Chad's with everything you ever wanted",
};

const jbn = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </head>
      <body className={`${jbn.className} flex h-[100dvh] flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="h-full flex-[1] overflow-scroll overflow-x-hidden">
            {children}
          </main>
          <footer className="grid h-16 w-full grid-cols-3 grid-rows-1 dark:bg-neutral-900 bg-white shadow-2xl md:hidden">
            <Link
              href="/"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:text-white text-black"
            >
              <div className="flex h-full flex-col items-center justify-center pt-1">
                <Home fontSize={36} />
                <span className="font-sans text-sm">Home</span>
              </div>
            </Link>
            <Link
              href="/cart"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:text-white text-black"
            >
              <div className="flex h-full flex-col items-center justify-center pt-1">
                <ShoppingCart fontSize={36} />
                <span className="font-sans text-sm">Cart</span>
              </div>
            </Link>
            <Link
              href="/account"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:text-white text-black"
            >
              <div className="flex h-full flex-col items-center justify-center pt-1">
                <UserCircle2 fontSize={36} />
                <span className="font-sans text-sm">Account</span>
              </div>
            </Link>
          </footer>
          <Toaster />
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
