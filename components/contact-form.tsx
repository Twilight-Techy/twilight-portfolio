"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({ errors: {} })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formReset, setFormReset] = useState(false)

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormReset(false)

    const formData = new FormData(event.currentTarget)
    const result = await submitContactForm({ errors: {} }, formData)

    setFormState(result)
    setIsSubmitting(false)

    if (result.success) {
      setFormReset(true)
      event.currentTarget.reset()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formState.success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your message has been sent successfully. I'll get back to you soon!</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {formState.errors?._form && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Alert className="bg-destructive/10 text-destructive border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formState.errors._form}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                aria-describedby={formState.errors?.name ? "name-error" : undefined}
                className={formState.errors?.name ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {formState.errors?.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {formState.errors.name[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                aria-describedby={formState.errors?.email ? "email-error" : undefined}
                className={formState.errors?.email ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {formState.errors?.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {formState.errors.email[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              placeholder="Subject"
              aria-describedby={formState.errors?.subject ? "subject-error" : undefined}
              className={formState.errors?.subject ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {formState.errors?.subject && (
              <p id="subject-error" className="text-sm text-destructive">
                {formState.errors.subject[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows={5}
              aria-describedby={formState.errors?.message ? "message-error" : undefined}
              className={formState.errors?.message ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {formState.errors?.message && (
              <p id="message-error" className="text-sm text-destructive">
                {formState.errors.message[0]}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

