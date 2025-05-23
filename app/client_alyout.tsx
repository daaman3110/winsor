// This is the client component
"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Optional: Use pathname for client-side logic like scroll to top
  useEffect(() => {
    if (pathname !== "/") {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return <>{children}</>
}
