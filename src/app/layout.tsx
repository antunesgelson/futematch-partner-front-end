import ConditionalSidebar from "@/components/sidebar/contitionalSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Futematch Partner",
  description: "Admin dashboard for Futematch partners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <SidebarProvider>
          <ConditionalSidebar />
          <main className="bg-white flex-1 min-h-screen max-w-full overflow-x-hidden">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
