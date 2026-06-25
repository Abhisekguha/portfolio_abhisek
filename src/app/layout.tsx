import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhisek Guha | AI Systems Engineer",
  description:
    "Production AI systems, agentic workflows, OCR & vision — portfolio of Abhisek Guha, AI/ML Engineer.",
  openGraph: {
    title: "Abhisek Guha | AI Systems Engineer",
    description: "I don't build demos. I build AI systems that survive production.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
