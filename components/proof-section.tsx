"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Users } from "lucide-react"
import Image from "next/image"

const earningsProof = [
  {
    id: 1,
    image: "/images/earnings-1.png",
    highlight: "$17,259.62",
    description: "Monthly earnings from a top-performing creator",
  },
  {
    id: 2,
    image: "/images/earnings-2.png",
    highlight: "$14,735.11",
    description: "Consistent monthly revenue with Hushly management",
  },
  {
    id: 3,
    image: "/images/earnings-3.png",
    highlight: "$12,045.14",
    description: "Growing creator achieving five-figure months",
  },
  {
    id: 4,
    image: "/images/earnings-4.png",
    highlight: "$9,622.17",
    description: "Steady earnings growth month over month",
  },
  {
    id: 5,
    image: "/images/earnings-5.png",
    highlight: "$7,839.52",
    description: "Creator earnings after strategic optimization",
  },
  {
    id: 6,
    image: "/images/earnings-6.png",
    highlight: "$6,859.22",
    description: "New creator building momentum with Hushly",
  },
]

const stats = [
  { icon: DollarSign, value: "$2.4M+", label: "Total Creator Earnings" },
  { icon: TrendingUp, value: "340%", label: "Average Growth Rate" },
  { icon: Users, value: "150+", label: "Successful Creators" },
]

export function ProofSection() {
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
      id="proof"
      ref={sectionRef}
      className="py-20 md:py-32 bg-charcoal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Proof of <span className="text-rose">Success</span>
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Real earnings from real creators. These results speak for themselves.
          </p>
        </div>

        {/* Stats Bar */}
        <div
          className={`mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <stat.icon className="h-8 w-8 text-rose mb-3" />
              <span className="font-serif text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-sm text-white/60 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Earnings Grid */}
        <div
          className={`mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {earningsProof.map((proof, index) => (
            <Card
              key={proof.id}
              className="group bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden hover:border-rose/30 transition-all duration-300 hover:shadow-xl hover:shadow-rose/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Screenshot Container */}
                <div className="relative aspect-[4/3] bg-charcoal-light overflow-hidden">
                  <Image
                    src={proof.image || "/placeholder.svg"}
                    alt={proof.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                
                {/* Info */}
                <div className="p-4">
                  <span className="font-serif text-xl font-bold text-rose block mb-1">
                    {proof.highlight}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {proof.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          className={`mt-8 text-center text-xs text-white/40 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          * Results may vary. Screenshots are from verified creator accounts with permission.
        </p>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button
            asChild
            size="lg"
            className="bg-rose text-white font-bold hover:bg-rose-dark transition-all duration-300 hover:scale-105"
          >
            <a href="https://hushly.apply/form" target="_blank" rel="noopener noreferrer">
              Start Earning More
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
