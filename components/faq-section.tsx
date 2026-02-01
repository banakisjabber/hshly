"use client"

import { useEffect, useRef, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What does Hushly do?",
    answer:
      "We manage your OnlyFans from growth to revenue, so you earn more with less effort. Our team handles everything from content strategy to fan engagement.",
  },
  {
    question: "How do I apply?",
    answer:
      "Click 'Apply Now' anywhere on our site. Our team reviews applications within 24 hours and will reach out to discuss next steps.",
  },
  {
    question: "What's the cost?",
    answer:
      "We work on performance-based fees with no upfront costs. You only pay when you see results, ensuring our interests are aligned with yours.",
  },
  {
    question: "Is it confidential?",
    answer:
      "100% - Your privacy is our top priority. We use secure communication channels and never share your personal information.",
  },
  {
    question: "Do you handle all platforms?",
    answer:
      "Yes, we focus primarily on OnlyFans but offer multi-platform integration including Instagram, Twitter, TikTok, and more to maximize your reach.",
  },
  {
    question: "What results can I expect?",
    answer:
      "On average, creators see 300-500% growth in earnings within 3-6 months. Results vary based on your starting point and engagement level.",
  },
  {
    question: "How do we communicate?",
    answer:
      "Weekly strategy calls, daily updates via our secure app, and 24/7 access to your dedicated account manager for any urgent needs.",
  },
  {
    question: "Who is Hushly for?",
    answer:
      "Ambitious creators ready to scale their OnlyFans business. Whether you're just starting or looking to reach the top 1%, we're here to help.",
  },
]

export function FAQSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 md:py-32 bg-muted"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Frequently Asked <span className="text-rose">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about working with Hushly
          </p>
        </div>

        {/* Accordion */}
        <div
          className={`mt-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-charcoal hover:text-rose hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
