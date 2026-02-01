"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  DollarSign,
  Target,
  MessageCircle,
  Palette,
  Calendar,
} from "lucide-react"

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Growth",
    description:
      "Explode your visibility across platforms like Instagram and Twitter with targeted campaigns and organic strategies. We handle posting, collaborations, and analytics to attract loyal followers fast.",
  },
  {
    icon: DollarSign,
    title: "Revenue Optimization",
    description:
      "Smart pricing, upsells, and monetization tactics to turn fans into high-value subscribers. Maximize every interaction and watch your earnings grow consistently.",
  },
  {
    icon: Target,
    title: "Marketing Strategy",
    description:
      "Custom plans including ads, SEO, and partnerships to drive traffic and conversions. We craft campaigns that resonate with your audience and deliver measurable results.",
  },
  {
    icon: MessageCircle,
    title: "Fan Engagement",
    description:
      "24/7 chat management, personalized interactions, and loyalty programs to boost retention. Keep your fans coming back with meaningful connections.",
  },
  {
    icon: Palette,
    title: "Branding Development",
    description:
      "Craft a unique identity with logos, bios, and visuals that resonate with your audience. Stand out in a crowded market with cohesive, memorable branding.",
  },
  {
    icon: Calendar,
    title: "Content Strategy",
    description:
      "Optimized scheduling, idea generation, and performance tracking to create content that converts. Never run out of ideas or miss peak engagement times.",
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blush/5 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Our <span className="text-rose">Services</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive management solutions designed to scale your success
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 md:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group relative bg-background border-border hover:border-rose/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-charcoal to-charcoal-light mb-4 group-hover:from-rose group-hover:to-rose-dark transition-all duration-300">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="font-serif text-xl font-bold text-charcoal group-hover:text-rose transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
