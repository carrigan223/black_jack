import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import StyledMain from "./components/containers/main/StyledMain";
import BackgroundImage from "./components/containers/main/BackgroundImage";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blackjack",
  description:
    "A simple blackjack game built with Next.js, TypeScript, and Styled Components.",
  keywords: ["blackjack", "next.js", "typescript", "styled-components"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
          {children}
      </body>
    </html>
  );
}
