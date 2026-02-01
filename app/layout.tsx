import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const _montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'Hushly - OnlyFans Management Agency | Grow Your Empire',
  description: 'Expert OnlyFans management for ambitious creators. Hushly handles Social Media Growth, Revenue Optimization, Marketing Strategy, Fan Engagement, Branding Development, and Content Strategy. Apply now for results-driven OFM services.',
  keywords: 'OnlyFans management agency, OFM services for creators, OnlyFans growth, creator management, fan engagement, content strategy, social media growth',
  generator: 'Hushly',
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
  openGraph: {
    title: 'Hushly - OnlyFans Management Agency',
    description: 'Expert management for ambitious creators. Grow your audience, maximize earnings, and build a lasting brand.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#d1948d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
