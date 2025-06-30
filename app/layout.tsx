"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "@/components/SchematicWrapped";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schematicPubKey = process.env. NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY
  if (!schematicPubKey) {
    throw new Error("Pub Key Missing")
  }

  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SchematicProvider publishableKey={schematicPubKey}>
        <SchematicWrapped>
        <ConvexClientProvider>
        {children}
        <Toaster richColors />
        </ConvexClientProvider>
        </SchematicWrapped>
        </SchematicProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
