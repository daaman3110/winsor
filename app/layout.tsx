// This is the server component
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Winsor World Export - Premium Seafood Exports",
  description:
    "Discover the finest seafood from around the world with Winsor World Export. We offer premium, sustainably sourced seafood exports for discerning customers globally.",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png" }],
      other: [
        { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
        { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
      ],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
