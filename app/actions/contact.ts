"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// Note: nodemailer requires the Node runtime. Server actions use it by default,
// so do not set `export const runtime = "edge"` on any route that calls this.

// Define validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
  // Honeypot: real people leave this empty, most bots fill every field they find.
  website: z.string().max(0).optional(),
})

export type ContactFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
}

const GENERIC_FAILURE =
  "Sorry, the message could not be sent. Please email mzone7325@gmail.com directly."

function getTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD.",
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 is implicit TLS; 587 upgrades via STARTTLS
    auth: { user, pass },
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { name, email, subject, message, website } = validatedFields.data

  // Honeypot tripped: accept silently so the bot does not learn it was caught,
  // but send nothing.
  if (website) {
    return { success: true }
  }

  try {
    const transporter = getTransport()
    const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER

    await transporter.sendMail({
      // The From address must belong to the authenticated mailbox, so the
      // visitor's address goes in Reply-To instead. Hitting reply answers them.
      from: `"Portfolio contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    })

    return { success: true }
  } catch (error) {
    // Log the real reason for us; show the visitor something actionable.
    console.error("Contact form failed to send:", error)

    return {
      errors: { _form: [GENERIC_FAILURE] },
      success: false,
    }
  }
}
