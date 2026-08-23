import type React from "react"
import { Suspense } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollRestoration } from "@/components/scroll-restoration"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Twilight Techy - Software Engineer Portfolio",
  description: "A modern portfolio website showcasing full-stack development projects and skills",
  creator: "Ibrahim Makanjuola (Twilight Techy)",
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="portfolio-theme">
          <Suspense fallback={null}>
            <ScrollRestoration />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'