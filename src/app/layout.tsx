import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tanushree T B — Computer Science Engineer",
  description: "Portfolio of Tanushree T B, Computer Science Engineer specializing in Machine Learning, Full Stack Web Development, and human-centric software solutions.",
  keywords: ["Tanushree T B", "Computer Science", "Frontend Developer", "Machine Learning", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${caveat.variable} font-sans antialiased bg-[#E9CEB3] text-[#4C3526] dark:bg-[#1C120C] dark:text-[#FBEAD5] selection:bg-[#4C3526] selection:text-[#FBEAD5] dark:selection:bg-[#FBEAD5] dark:selection:text-[#1C120C]`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
