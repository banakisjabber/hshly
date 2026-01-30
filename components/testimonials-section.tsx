"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Hushly doubled my earnings in just three months—absolute game-changer!",
    name: "Sarah K.",
    title: "Top Creator",
    initials: "SK",
  },
  {
    quote: "Finally, a team that understands the industry. My engagement is through the roof!",
    name: "Emma L.",
    title: "Rising Star",
    initials: "EL",
  },
  {
    quote: "The content strategy alone was worth it. I never run out of ideas anymore.",
    name: "Jessica M.",
    title: "Featured Creator",
    initials: "JM",
  },
  {
    quote: "Professional, discreet, and results-driven. Exactly what I needed.",
    name: "Amanda R.",
    title: "Top 1% Creator",
    initials: "AR",
  },
  {
    quote: "My social media following grew 400% since partnering with Hushly. Incredible!",
    name: "Michelle T.",
    title: "Verified Creator",
    initials: "MT",
  },
  {
    quote: "They handle everything so I can focus on what I do best. Highly recommend!",
    name: "Sophia B.",
    title: "Premium Creator",
    initials: "SB",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  return (
    <section
      id="testimonials"
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
            What Creators <span className="text-rose">Say</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Real results from real creators who trusted Hushly
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm max-w-2xl mx-auto">
                      <CardContent className="p-8 sm:p-12">
                        <Quote className="h-10 w-10 text-rose/50 mb-6" />
                        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium italic leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-8 flex items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-rose">
                            <AvatarFallback className="bg-blush text-charcoal font-semibold">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-white">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-white/60">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-rose w-6"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-rose text-white font-bold hover:bg-rose-dark transition-all duration-300 hover:scale-105"
          >
            <a href="https://hushly.apply/form" target="_blank" rel="noopener noreferrer">
              Start Your Success Story
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
