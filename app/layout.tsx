import type React from "react"
import { Suspense } from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollRestoration } from "@/components/scroll-restoration"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL("https://www.twilighttechy.dev"),
  title: {
    default: "Ibrahim A. Makanjuola, Software Engineer, AI Systems",
    template: "%s · Ibrahim A. Makanjuola",
  },
  description:
    "Software engineer building AI systems: LLM inference infrastructure, tool-calling agents, and on-device ML. Serving open-weight models with vLLM, agents that actuate hardware, and networks quantized onto microcontrollers.",
  keywords: [
    "Ibrahim Makanjuola",
    "software engineer",
    "AI systems",
    "agentic AI",
    "AI agents",
    "LLM inference",
    "vLLM",
    "Model Context Protocol",
    "machine learning engineer",
    "edge AI",
    "backend engineer",
    "Python",
    "TypeScript",
    "FastAPI",
    "Lagos",
    "Nigeria",
  ],
  authors: [{ name: "Ibrahim A. Makanjuola", url: "https://github.com/Twilight-Techy" }],
  creator: "Ibrahim A. Makanjuola",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ibrahim A. Makanjuola, Software Engineer, AI Systems",
    description:
      "LLM inference infrastructure, tool-calling agents, and models small enough to run on a microcontroller.",
    siteName: "Ibrahim A. Makanjuola",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim A. Makanjuola, Software Engineer, AI Systems",
    description:
      "LLM inference infrastructure, tool-calling agents, and models small enough to run on a microcontroller.",
    creator: "@iMaksxAI",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ibrahim A. Makanjuola",
  alternateName: "Twilight Techy",
  jobTitle: "Software Engineer",
  description:
    "Software engineer building AI systems: LLM inference infrastructure, tool-calling agents, and on-device ML.",
  url: "https://www.twilighttechy.dev",
  email: "mailto:mzone7325@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lagos State University",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models",
    "AI Agents",
    "Machine Learning",
    "Edge AI",
    "Backend Engineering",
    "Python",
    "TypeScript",
  ],
  sameAs: [
    "https://github.com/Twilight-Techy",
    "https://www.linkedin.com/in/ibrahim-makanjuola",
    "https://x.com/iMaksxAI",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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