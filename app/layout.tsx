import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import StyledMain from "./components/containers/main/StyledMain";
import BackgroundImage from "./components/containers/main/BackgroundImage";
import Header from "./components/header/Header";

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
      <body style={{ height: "100vh" }} className={lora.className}>
        <main style={{ height: "100%" }}>
          <BackgroundImage />
          <Header />
          <div style={{ height: "92%", overflow: "auto" }}>{children}</div>
        </main>
      </body>
    </html>
  );
}
