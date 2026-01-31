"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { CheckCircle2, Loader2 } from "lucide-react"

interface ApplyButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children?: React.ReactNode
}

type ContactMethod = "email" | "phone" | "ig"

interface FormData {
  name: string
  instagram: string
  email: string
  onlyfans: string
  priorAgency: boolean
  contactMethod: ContactMethod
  phone: string
}

interface FormErrors {
  name?: string
  instagram?: string
  email?: string
  onlyfans?: string
  contactMethod?: string
  phone?: string
}

export function ApplyButton({
  className,
  variant = "default",
  size = "default",
  children = "Apply Now",
}: ApplyButtonProps) {
  const [open, setOpen] = useState(false)
  const [modalOpenTime, setModalOpenTime] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitError, setSubmitError] = useState<string>("")

  const [formData, setFormData] = useState<FormData>({
    name: "",
    instagram: "",
    email: "",
    onlyfans: "",
    priorAgency: false,
    contactMethod: "email",
    phone: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // Record when modal opens for spam protection
  useEffect(() => {
    if (open) {
      setModalOpenTime(Date.now())
      // Reset form state when opening
      if (submitStatus !== "idle") {
        setSubmitStatus("idle")
        setSubmitError("")
        setFormData({
          name: "",
          instagram: "",
          email: "",
          onlyfans: "",
          priorAgency: false,
          contactMethod: "email",
          phone: "",
        })
        setErrors({})
      }
    }
  }, [open, submitStatus])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.instagram.trim()) {
      newErrors.instagram = "Instagram handle is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (formData.onlyfans && !/^https?:\/\/.+/.test(formData.onlyfans)) {
      newErrors.onlyfans = "Please enter a valid URL"
    }

    if (!formData.contactMethod) {
      newErrors.contactMethod = "Please select a contact method"
    }

    if (formData.contactMethod === "phone" && !formData.phone.trim()) {
      newErrors.phone = "Phone number is required when phone is selected"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    // Spam protection: check if form was submitted too quickly (< 1.5s)
    const timeSinceOpen = Date.now() - modalOpenTime
    if (timeSinceOpen < 1500) {
      // Silently treat as success for bots
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitting(false)
      setSubmitStatus("success")
      return
    }

    // Strip leading @ from Instagram handle
    const cleanInstagram = formData.instagram.replace(/^@/, "")

    const payload = {
      name: formData.name.trim(),
      instagram: cleanInstagram,
      email: formData.email.trim(),
      onlyfans: formData.onlyfans.trim() || null,
      priorAgency: formData.priorAgency,
      contactMethod: formData.contactMethod,
      phone: formData.contactMethod === "phone" ? formData.phone.trim() : null,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    }

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_APPLICATION_WEBHOOK_URL

      if (!webhookUrl) {
        throw new Error("Application webhook URL is not configured")
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setSubmitStatus("success")
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {submitStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="font-serif text-2xl font-bold text-charcoal mb-2">
              Application Received!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mb-6">
              Thank you for applying. We&apos;ll review your application and get back to you soon.
            </DialogDescription>
            <Button onClick={() => setOpen(false)} className="bg-rose text-white hover:bg-rose-dark">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-bold text-charcoal">
                Apply to Hushly
              </DialogTitle>
              <DialogDescription>
                Fill out the form below and we&apos;ll be in touch to discuss how we can help grow your brand.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-charcoal font-medium">
                  Full Name <span className="text-rose">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Instagram Handle */}
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-charcoal font-medium">
                  Instagram Handle <span className="text-rose">*</span>
                </Label>
                <Input
                  id="instagram"
                  placeholder="@yourusername"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  className={errors.instagram ? "border-destructive" : ""}
                />
                {errors.instagram && (
                  <p className="text-sm text-destructive">{errors.instagram}</p>
                )}
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-charcoal font-medium">
                  Contact Email <span className="text-rose">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* OnlyFans Link */}
              <div className="space-y-2">
                <Label htmlFor="onlyfans" className="text-charcoal font-medium">
                  OnlyFans Link <span className="text-muted-foreground text-sm">(optional)</span>
                </Label>
                <Input
                  id="onlyfans"
                  type="url"
                  placeholder="https://onlyfans.com/yourusername"
                  value={formData.onlyfans}
                  onChange={(e) => handleInputChange("onlyfans", e.target.value)}
                  className={errors.onlyfans ? "border-destructive" : ""}
                />
                {errors.onlyfans && (
                  <p className="text-sm text-destructive">{errors.onlyfans}</p>
                )}
              </div>

              {/* Prior Agency Toggle */}
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="priorAgency" className="text-charcoal font-medium cursor-pointer">
                  Worked with a prior agency before?
                </Label>
                <Switch
                  id="priorAgency"
                  checked={formData.priorAgency}
                  onCheckedChange={(checked) => handleInputChange("priorAgency", checked)}
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-3">
                <Label className="text-charcoal font-medium">
                  Preferred Contact Method <span className="text-rose">*</span>
                </Label>
                <RadioGroup
                  value={formData.contactMethod}
                  onValueChange={(value) => handleInputChange("contactMethod", value as ContactMethod)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="email" id="contact-email" />
                    <Label htmlFor="contact-email" className="cursor-pointer font-normal">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="phone" id="contact-phone" />
                    <Label htmlFor="contact-phone" className="cursor-pointer font-normal">
                      Phone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="ig" id="contact-ig" />
                    <Label htmlFor="contact-ig" className="cursor-pointer font-normal">
                      Instagram
                    </Label>
                  </div>
                </RadioGroup>
                {errors.contactMethod && (
                  <p className="text-sm text-destructive">{errors.contactMethod}</p>
                )}
              </div>

              {/* Conditional Phone Number Field */}
              {formData.contactMethod === "phone" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-charcoal font-medium">
                    Phone Number <span className="text-rose">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && submitError && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose text-white font-semibold hover:bg-rose-dark transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
