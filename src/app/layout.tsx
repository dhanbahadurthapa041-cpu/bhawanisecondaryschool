import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { TopHeader } from "@/components/layout/TopHeader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { SCHOOL_INFO } from "@/lib/mock-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SCHOOL_INFO.name}`,
    default: `${SCHOOL_INFO.name} - Badhaiyatal 3 Semara, Bardiya`,
  },
  description: `${SCHOOL_INFO.tagline}. ${SCHOOL_INFO.nepaliName}, Badhaiyatal-3, Bardiya. Quality education from ECD to Class 12.`,
  keywords: [
    "Shree Bhawani Secondary School",
    "Bhawani Secondary School Bardiya",
    "Badhaiyatal School",
    "Semara Bardiya School",
    "Class 11 12 Bardiya",
    "ECD to 12 School Nepal",
  ],
  authors: [{ name: SCHOOL_INFO.name }],
  openGraph: {
    title: `${SCHOOL_INFO.name} - Badhaiyatal, Bardiya`,
    description: `${SCHOOL_INFO.nepaliName} - ECD to Class 12, Badhaiyatal 3 Semara, Bardiya`,
    type: "website",
    locale: "en_US",
    siteName: SCHOOL_INFO.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="flex flex-col min-h-screen">
        <LanguageProvider>
          <TopHeader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
