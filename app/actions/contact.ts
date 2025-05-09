"use server"

import { z } from "zod"

// Define validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
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

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Validate form data
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  // Get validated data
  const { name, email, subject, message } = validatedFields.data

  try {
    // For v0 preview, just log the data and simulate success
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
    })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Return success state
    return {
      success: true,
    }
  } catch (error) {
    console.error("Error in contact form:", error)

    // Handle any errors
    return {
      errors: {
        _form: ["Failed to send message. Please try again later."],
      },
      success: false,
    }
  }
}

