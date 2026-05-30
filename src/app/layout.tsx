import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";
// import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/globalInventory/theme-provider";
const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Portfolio - Gaziur Rahman",
   description: "Gaziur Rahman - Full-Stack Developer",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="theme">
               <div suppressHydrationWarning>
                 {children}
                 <Toaster position="top-right" richColors></Toaster>
               </div>
            </ThemeProvider>
         </body>
      </html>
   );
}
