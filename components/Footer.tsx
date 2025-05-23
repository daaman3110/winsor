import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="font-sans">Winsor World Export</span>
            </h3>
            <p className="mb-4">Premium seafood exports from the world's finest oceans.</p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="https://instagram.com" className="hover:text-pink-400 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-blue-600 transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-blue-400 transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/our-journey" className="hover:text-blue-400 transition-colors">
                  Our Journey
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Plot 801,802/1/2 GIDC Estate, Veraval, 362269, Gujarat, India
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <div className="flex flex-col">
                  <span>Soyab Kapadiya : +91 92273 39111</span>
                  <span>Shafi Kapadiya : +91 92273 39333</span>
                  <span>Amit Patel : +91 97370 00224</span>
                </div>
              </li>
              <li className="flex items-center mt-2">
                <Mail size={18} className="mr-2" />
                winsorworldexport@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Winsor World Export. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          Developed by:{" "}
          <a href="mailto:daamanpatel4@gmail.com" className="hover:text-blue-400 transition-colors">
            Daaman Amit Patel
          </a>
        </p>
        </div>
      </div>
    </footer>
  )
}

