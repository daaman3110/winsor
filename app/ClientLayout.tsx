'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useScrollToTop } from "../hooks/useScrollToTop"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useScrollToTop()

  return (
    <>
      <Header />
      {children}
      {pathname !== "/" && <Footer />}
    </>
  )
} 