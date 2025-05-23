import "./globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import { useScrollToTop } from "../hooks/useScrollToTop"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { usePathname } from "next/navigation"

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "OceanTreasures - Premium Seafood Exports",
  description:
    "Discover the finest seafood from around the world with OceanTreasures. We offer premium, sustainably sourced seafood exports for discerning customers globally.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useScrollToTop()
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Header />
        {children}
        {pathname !== "/" && <Footer />}
      </body>
    </html>
  )
}

