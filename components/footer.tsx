"use client"

import { Button } from "@/components/ui/button"
import { ApplyButton } from "@/components/apply-button"
import { Instagram, Mail, ArrowRight } from "lucide-react"

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#proof", label: "Results" },
  { href: "#faq", label: "FAQ" },
]

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer id="contact" className="bg-charcoal py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-serif text-3xl font-bold text-white">
              Hushly
            </span>
            <p className="mt-4 text-white/70 max-w-md leading-relaxed">
              Your premier partner in OnlyFans success. We empower ambitious creators to grow their audience, maximize earnings, and build lasting brands.
            </p>
            <ApplyButton
              className="mt-6 bg-rose text-white font-semibold hover:bg-rose-dark transition-all duration-300"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </ApplyButton>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className="text-white/70 hover:text-rose transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://instagram.com/hushlyco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-rose transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@hushlyco</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:apply@hushly.agency"
                  className="flex items-center gap-3 text-white/70 hover:text-rose transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>apply@hushly.agency</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Hushly. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/50 text-sm hover:text-rose transition-colors"
              >
                
              </a>
              <a
                href="#"
                className="text-white/50 text-sm hover:text-rose transition-colors"
              >
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
