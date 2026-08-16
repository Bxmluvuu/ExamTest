import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const thaiFont = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ExamPlatform — คลังเนื้อหาและระบบสอบอัจฉริยะ",
    template: "%s | ExamPlatform",
  },
  description: "ระบบคลังเนื้อหา สไลด์ PDF และคลังข้อสอบตาม Exam Blueprint พร้อมวิเคราะห์จุดอ่อนรายบุคคล",
  keywords: ["Exam", "คลังข้อสอบ", "แบบฝึกหัด", "Blueprint", "Analytics", "Database Systems", "Computer Networks"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${inter.variable} ${thaiFont.variable}`}>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-[var(--primary-subtle)] selection:text-[var(--primary)]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
