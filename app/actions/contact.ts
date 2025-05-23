"use server"

import { Resend } from "resend"

const resend = new Resend('re_6yf46gzX_7M6attsknkHSSRRAme3f9iQJ')

interface FormData {
  name: string
  email: string
  phone: string
  country: string
  message: string
  productName?: string
  quantity?: string
}

export async function submitContactForm(formData: FormData) {
  const { name, email, phone, country, message, productName, quantity } = formData

  if (!name || !email || !phone || !country) {
    return { success: false, message: "Please fill out all required fields." }
  }

  try {
    // Determine if it's a quote request based on the presence of productName
    const isQuoteRequest = Boolean(productName)

    // Format the email content with proper spacing and line breaks
    const emailContent = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Country: ${country}
${isQuoteRequest ? `Product Name: ${productName}\nQuantity: ${quantity}\n` : ""}
Message: ${message}
    `.trim()

    // Send email to the company
    await resend.emails.send({
      from: "Winsor World Export <onboarding@resend.dev>",
      to: "daaman3110@gmail.com", // Replace with actual email
      subject: isQuoteRequest
        ? `Quote Request for ${productName} from ${name}`
        : `Contact Form Submission from ${name}`,
      text: emailContent,
    })

    // Send confirmation email to the user
    const userEmailContent = isQuoteRequest
      ? `
Dear ${name},

Thank you for requesting a quote for ${productName}. We appreciate your interest in our products.

Here's a summary of your request:
- Product: ${productName}
- Quantity: ${quantity}
- Additional Information: ${message}

Our team will review your request and get back to you with a detailed quote within 24-48 business hours.

If you have any urgent questions, please contact us at:
Phone: +91 92273 39111 (Soyeb Kapadiya)
Email: winsorworldexport@gmail.com

Best regards,
Winsor World Export Team
      `.trim()
      : `
Dear ${name},

Thank you for contacting Winsor World Export. We have received your message and will get back to you shortly.

Our team typically responds within 24-48 business hours.

If you have any urgent questions, please contact us at:
Phone: +91 92273 39111 (Soyeb Kapadiya)
Email: winsorworldexport@gmail.com

Best regards,
Winsor World Export Team
      `.trim()

    await resend.emails.send({
      from: "Winsor World Export <onboarding@resend.dev>",
      to: email,
      subject: isQuoteRequest
        ? "Quote Request Received - Winsor World Export"
        : "Thank You for Contacting Winsor World Export",
      text: userEmailContent,
    })

    return {
      success: true,
      message: isQuoteRequest
        ? "Your quote request has been submitted successfully. We'll get back to you soon!"
        : "Thank you for your message. We'll get back to you soon!",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "An error occurred while sending your message. Please try again later." }
  }
}

