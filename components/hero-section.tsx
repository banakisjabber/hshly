"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Sparkles } from "lucide-react"

interface HeroSectionProps {
  isVisible: boolean
}

export function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[110vh] md:min-h-[115vh] flex items-center justify-center overflow-hidden"
    >
      {/* Base Gradient Background - extended darker section */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal from-0% via-charcoal via-85% to-cream/70 to-100%" />
      
      {/* Bokeh Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large primary glow - top right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-rose/30 blur-[120px] animate-pulse" />
        
        {/* Medium secondary glow - bottom left */}
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-rose/25 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Smaller accent glow - center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-blush/20 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Small floating bokeh orbs */}
        <div className="absolute top-1/4 left-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-rose/40 blur-[40px] animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[60%] right-[20%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-blush/50 blur-[35px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[20%] right-[30%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-rose/35 blur-[30px] animate-pulse" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-[30%] left-[25%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-blush/45 blur-[25px] animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Subtle noise texture overlay for depth */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center pt-16 pb-40 md:pt-0 md:pb-24">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight text-balance">
            Elevate Your OnlyFans Empire with{" "}
            <span className="text-rose">Hushly</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-5 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium text-pretty max-w-3xl mx-auto leading-relaxed">
            Expert management for ambitious creators: Grow your audience, maximize earnings, and build a lasting brand.
          </p>

          {/* Description */}
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto text-pretty leading-relaxed">
            Hushly handles the hustle so you can focus on creating. From social media boosts to fan engagement strategies, we deliver results that scale your income sustainably.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-rose text-white font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 hover:bg-rose-dark transition-all duration-300 hover:scale-105 shadow-2xl shadow-rose/30"
            >
              <a href="https://hushly.apply/form" target="_blank" rel="noopener noreferrer">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-medium text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-transparent backdrop-blur-sm"
            >
              <a href="#services">
                Explore Services
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Extended Bottom Fade for Smooth Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-muted/80 to-transparent pointer-events-none" />
    </section>
  )
}
