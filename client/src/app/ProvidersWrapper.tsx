

"use client"


import './globals.css'
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider> 
        {children}
    </SessionProvider>
  );
}
