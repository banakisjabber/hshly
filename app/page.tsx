"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section" // Added import for TestimonialsSection
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ProofSection } from "@/components/proof-section" // Added import for ProofSection

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection isVisible={isVisible} />
      <AboutSection />
      <ServicesSection />
      <ProofSection /> // Added ProofSection component
      <FAQSection />
      <Footer />
    </main>
  )
}
