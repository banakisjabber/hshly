"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const formSchema = z
  .object({
    name: z.string().min(1, "Full Name is required"),
    instagram: z.string().min(1, "Instagram Handle is required"),
    email: z.string().email("Please enter a valid email address"),
    onlyfans: z
      .union([
        z.string().url("Please enter a valid URL"),
        z.literal(""),
      ])
      .optional(),
    priorAgency: z.boolean().default(false),
    contactMethod: z.enum(["email", "phone", "ig"], {
      required_error: "Preferred Contact Method is required",
    }),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.contactMethod === "phone") {
        return data.phone && data.phone.trim().length > 0
      }
      return true
    },
    {
      message: "Phone Number is required when Phone is selected",
      path: ["phone"],
    }
  )

type FormValues = z.infer<typeof formSchema>

interface ApplyButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"
  children?: React.ReactNode
}

export function ApplyButton({
  className,
  variant = "default",
  size = "default",
  children,
}: ApplyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const modalOpenTimeRef = useRef<number | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      instagram: "",
      email: "",
      onlyfans: "",
      priorAgency: false,
      contactMethod: "email",
      phone: "",
    },
  })

  const contactMethod = watch("contactMethod")
  const priorAgency = watch("priorAgency")

  useEffect(() => {
    if (isOpen) {
      modalOpenTimeRef.current = Date.now()
    }
  }, [isOpen])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setError(null)

    // Spam protection: 1.5s minimum submit time
    const elapsedTime = modalOpenTimeRef.current
      ? Date.now() - modalOpenTimeRef.current
      : 0
    const minimumTime = 1500

    if (elapsedTime < minimumTime) {
      // Silently treat as success if submitted too fast
      setIsSuccess(true)
      setIsSubmitting(false)
      return
    }

    try {
      // Read Google Form environment variables
      // Using no-cors mode because Google Forms doesn't support CORS headers.
      // This means we can't read the response, but if fetch resolves without exception,
      // we treat it as successful. Google Forms is the backend (no Apps Script needed).
      const formActionUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL?.trim()
      const entryName = process.env.NEXT_PUBLIC_GF_ENTRY_NAME?.trim()
      const entryInstagram = process.env.NEXT_PUBLIC_GF_ENTRY_INSTAGRAM?.trim()
      const entryEmail = process.env.NEXT_PUBLIC_GF_ENTRY_EMAIL?.trim()
      const entryOnlyfans = process.env.NEXT_PUBLIC_GF_ENTRY_ONLYFANS?.trim()
      const entryPriorAgency = process.env.NEXT_PUBLIC_GF_ENTRY_PRIOR_AGENCY?.trim()
      const entryContactMethod = process.env.NEXT_PUBLIC_GF_ENTRY_CONTACT_METHOD?.trim()
      const entryPhone = process.env.NEXT_PUBLIC_GF_ENTRY_PHONE?.trim()

      // Validate all required environment variables
      const missingVars: string[] = []
      if (!formActionUrl) missingVars.push("NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL")
      if (!entryName) missingVars.push("NEXT_PUBLIC_GF_ENTRY_NAME")
      if (!entryInstagram) missingVars.push("NEXT_PUBLIC_GF_ENTRY_INSTAGRAM")
      if (!entryEmail) missingVars.push("NEXT_PUBLIC_GF_ENTRY_EMAIL")
      if (!entryOnlyfans) missingVars.push("NEXT_PUBLIC_GF_ENTRY_ONLYFANS")
      if (!entryPriorAgency) missingVars.push("NEXT_PUBLIC_GF_ENTRY_PRIOR_AGENCY")
      if (!entryContactMethod) missingVars.push("NEXT_PUBLIC_GF_ENTRY_CONTACT_METHOD")
      if (!entryPhone) missingVars.push("NEXT_PUBLIC_GF_ENTRY_PHONE")

      if (missingVars.length > 0) {
        throw new Error(
          `Missing required environment variables: ${missingVars.join(", ")}. Please check your .env.local file and restart the dev server.`
        )
      }

      // Strip leading @ from Instagram handle
      const instagramHandle = data.instagram.replace(/^@+/, "")

      // Map contact method to Google Form option labels (must match exactly)
      const contactMethodMap: Record<"email" | "phone" | "ig", string> = {
        email: "Email",
        phone: "Phone",
        ig: "Instagram",
      }
      const contactMethodLabel = contactMethodMap[data.contactMethod]

      // Build URLSearchParams payload with entry.<id> format
      const params = new URLSearchParams()
      params.append(`entry.${entryName}`, data.name.trim())
      params.append(`entry.${entryInstagram}`, instagramHandle)
      params.append(`entry.${entryEmail}`, data.email.trim())
      params.append(
        `entry.${entryOnlyfans}`,
        data.onlyfans && data.onlyfans.trim() ? data.onlyfans.trim() : ""
      )
      params.append(
        `entry.${entryPriorAgency}`,
        data.priorAgency ? "Yes" : "No"
      )
      params.append(`entry.${entryContactMethod}`, contactMethodLabel)
      params.append(`entry.${entryPhone}`, (data.phone || "").trim())


      // Submit to Google Form using no-cors mode
      // Since no-cors returns an opaque response, we can't check the status.
      // If fetch resolves without exception, we treat it as successful.
      // formActionUrl is guaranteed to be defined here due to validation above
      await fetch(formActionUrl!, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      })

      // If we reach here, the fetch succeeded (no exception thrown)
      // With no-cors, we can't read the response, but Google Forms will have received the submission
      setIsSuccess(true)
      setIsSubmitting(false)
    } catch (err) {
      console.error("Application submission error:", err)

      // Provide helpful error messages
      let errorMessage = "An error occurred. Please try again."

      if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Allow closing even if submitting (user might want to cancel)
    // But prevent closing during active submission to avoid data loss
    if (isSubmitting && !isSuccess) {
      return
    }
    setIsOpen(false)
    setIsSuccess(false)
    setError(null)
    setIsSubmitting(false)
    reset()
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={className}
        variant={variant}
        size={size}
      >
        {children || "Apply"}
      </Button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply Now</DialogTitle>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  Application Received
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Thank you for your application. We'll review it and get back to you
                  soon.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 text-sm whitespace-pre-wrap">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  className={cn(errors.name && "border-red-500")}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Instagram Handle */}
              <div className="space-y-2">
                <Label htmlFor="instagram">
                  Instagram Handle <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="instagram"
                  {...register("instagram")}
                  placeholder="@username"
                  disabled={isSubmitting}
                  className={cn(errors.instagram && "border-red-500")}
                />
                {errors.instagram && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.instagram.message}
                  </p>
                )}
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* OnlyFans Link */}
              <div className="space-y-2">
                <Label htmlFor="onlyfans">OnlyFans Link</Label>
                <Input
                  id="onlyfans"
                  type="url"
                  {...register("onlyfans")}
                  placeholder="https://onlyfans.com/yourprofile"
                  disabled={isSubmitting}
                  className={cn(errors.onlyfans && "border-red-500")}
                />
                {errors.onlyfans && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.onlyfans.message}
                  </p>
                )}
              </div>

              {/* Prior Agency Experience */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="priorAgency" className="cursor-pointer">
                  Worked with a prior agency before?
                </Label>
                <Switch
                  id="priorAgency"
                  checked={priorAgency}
                  onCheckedChange={(checked) => setValue("priorAgency", checked)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="space-y-3">
                <Label>
                  Preferred Contact Method <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={contactMethod}
                  onValueChange={(value) =>
                    setValue("contactMethod", value as "email" | "phone" | "ig")
                  }
                  disabled={isSubmitting}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" />
                    <Label
                      htmlFor="contact-email"
                      className="font-normal cursor-pointer"
                    >
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="contact-phone" />
                    <Label
                      htmlFor="contact-phone"
                      className="font-normal cursor-pointer"
                    >
                      Phone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ig" id="contact-ig" />
                    <Label htmlFor="contact-ig" className="font-normal cursor-pointer">
                      Instagram
                    </Label>
                  </div>
                </RadioGroup>
                {errors.contactMethod && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.contactMethod.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number
                  {contactMethod === "phone" && (
                    <span className="text-red-500"> *</span>
                  )}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 000-0000"
                  disabled={isSubmitting}
                  className={cn(errors.phone && "border-red-500")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

