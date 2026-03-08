import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "พี่พาเที่ยว | จองทริปท่องเที่ยวง่ายๆ",
  description: "พี่พาเที่ยว - ระบบจองทริปท่องเที่ยวออนไลน์ ทริปคุณภาพ ราคาเป็นกันเอง จองง่าย จ่ายสะดวก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
