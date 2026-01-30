"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "500%",
    label: "Average Revenue Boost",
  },
  {
    icon: Users,
    value: "10M+",
    label: "Fans Engaged",
  },
  {
    icon: Award,
    value: "100%",
    label: "Creator Satisfaction",
  },
  {
    icon: Clock,
    value: "5+",
    label: "Years Experience",
  },
]

export function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="relative pt-8 pb-20 md:pt-12 md:pb-32 bg-muted"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            About <span className="text-rose">Hushly</span>
          </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Hushly is your partner in OnlyFans success, specializing in tailored strategies for women creators. With years of industry expertise, we focus on what matters: growth, revenue, and empowerment.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We understand the unique challenges creators face and provide hands-on support to help you thrive in a competitive landscape.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            className={`grid grid-cols-2 gap-4 sm:gap-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose/10 mb-4">
                  <stat.icon className="h-6 w-6 text-rose" />
                </div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm sm:text-base text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
