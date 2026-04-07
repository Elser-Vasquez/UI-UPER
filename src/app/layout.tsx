import type { Metadata } from "next"
import { Geist_Mono, Nunito } from "next/font/google"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
})

export const metadata: Metadata = {
  title: "UPER SaaS Platform",
  description: "Modular SaaS platform with Supabase-inspired design system",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${nunito.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-background text-foreground">
        <TooltipProvider delay={200}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
