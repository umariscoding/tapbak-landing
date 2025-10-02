import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TapBak",
  description: "Transform your customer loyalty program with digital cards that live in Apple & Google Wallet. Increase repeat visits and build lasting relationships.",
  icons: {
    icon: "/tapbak.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
