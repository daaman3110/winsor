"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
  }`

  const menuItems = ["Home", "Products", "Our Process", "About", "Gallery", "Contact"]

  return (
    <header className={`${headerClass} font-sans`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-4">
            <span className="text-3xl font-bold font-sans text-white">Winsor World Export</span>
          </Link>
          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-white hover:text-blue-300 transition-colors px-4 py-2 text-xl font-semibold font-sans ${
                    pathname === (item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`)
                      ? "bg-blue-600 rounded-lg hover:text-white"
                      : ""
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.button
            className="lg:hidden text-white hover:text-blue-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="lg:hidden bg-gray-900"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              {menuItems.map((item) => (
                <motion.div key={item} whileHover={{ x: 5 }} whileTap={{ x: 0 }}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block py-3 text-white hover:text-blue-300 transition-colors text-xl font-semibold font-sans"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

