import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReactQueryClient from "./tanstack";
import Theme from "./theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const embed = "/embed.jpg";

export const metadata: Metadata = {
  title: "Mydo",
  description:
    "A Category based, open source, local first, privacy-focused to do list :3",
  openGraph: {
    images: [
      {
        url: embed,
        secureUrl: embed,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: embed,
        secureUrl: embed,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-main/30`}
      >
        <ReactQueryClient>
          <Theme>{children}</Theme>
        </ReactQueryClient>
      </body>
    </html>
  );
}
