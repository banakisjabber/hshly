"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#proof", label: "Results" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#home")
            }}
            className="flex items-center gap-2"
          >
            <span className={`font-serif text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? "text-charcoal" : "text-white"
            }`}>
              Hushly
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`text-sm font-medium transition-colors hover:text-rose ${
                  isScrolled ? "text-charcoal" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-rose text-white font-semibold hover:bg-rose-dark transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <a href="https://hushly.apply/form" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isScrolled ? "text-charcoal" : "text-white"}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-charcoal border-charcoal-light px-6">
              <div className="flex flex-col gap-8 pt-8">
                <span className="font-serif text-2xl font-bold text-white">Hushly</span>
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }}
                      className="text-base font-medium text-white/90 transition-colors hover:text-rose"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <Button
                  asChild
                  size="default"
                  className="w-fit bg-rose text-white font-semibold hover:bg-rose-dark px-6"
                >
                  <a href="https://hushly.apply/form" target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
