"use server"

import { Resend } from "resend"

interface FormData {
  name: string
  email: string
  phone: string
  country: string
  quantity: string
  message: string
  productName: string
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function submitContactForm(formData: FormData) {
  const name = formData.name as string
  const email = formData.email as string
  const message = formData.message as string
  const phone = formData.phone as string
  const country = formData.country as string
  const quantity = formData.quantity as string
  const productName = formData.productName as string

  if (!name || !email || !message || !phone) {
    return { success: false, message: "Please fill out all required fields." }
  }

  try {
    if (resend) {
      // Send email to the company
      await resend.emails.send({
        from: "Winsor World Export <onboarding@resend.dev>",
        to: "contact@winsorworldexport.com", // Replace with your actual email
        subject: `New ${productName ? "Quote Request" : "Contact Form Submission"} from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          ${country ? `Country: ${country}` : ""}
          ${productName ? `Product: ${productName}` : ""}
          ${quantity ? `Quantity: ${quantity}` : ""}
          Message: ${message}
        `,
      })

      // Send automatic response to the user
      await resend.emails.send({
        from: "Winsor World Export <onboarding@resend.dev>",
        to: email,
        subject: "Thank you for contacting Winsor World Export",
        text: `
          Dear ${name},

          Thank you for contacting Winsor World Export. We have received your ${productName ? "quote request" : "message"} and appreciate your interest in our products and services.

          Our team will review your inquiry and get back to you as soon as possible. We strive to respond to all inquiries within 24-48 business hours.

          If you have any urgent questions, please don't hesitate to call us at +91 1234567890.

          Thank you for your patience and for considering Winsor World Export for your seafood needs.

          Best regards,
          The Winsor World Export Team
        `,
      })
    } else {
      // Fallback when API key is missing: log to console
      console.log("Form submission (API key missing):")
      console.log(`Name: ${name}`)
      console.log(`Email: ${email}`)
      console.log(`Phone: ${phone}`)
      console.log(`Country: ${country}`)
      console.log(`Product: ${productName}`)
      console.log(`Quantity: ${quantity}`)
      console.log(`Message: ${message}`)
    }

    return { success: true, message: "Thank you for your submission. We will get back to you soon!" }
  } catch (error) {
    console.error("Error processing form submission:", error)
    return { success: false, message: "An error occurred while sending your submission. Please try again later." }
  }
}

