import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "donaciones-mp",
  description: "Generated by colidevs CLI",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground border-border">
        <div className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4 antialiased">
          <header className="text-xl font-bold leading-[4rem]">
            <Link href="/">donaciones-mp</Link>
          </header>
          <main className="py-8">{children}</main>
          <footer className="text-center leading-[4rem] opacity-70">
            © {new Date().getFullYear()} donaciones-mp
          </footer>
        </div>
      </body>
    </html>
  );
}
