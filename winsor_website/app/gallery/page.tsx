"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Header from "../../components/Header"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  { src: "/gallery/image1.jpg", alt: "Fresh seafood display", category: "Products" },
  { src: "/gallery/image2.jpg", alt: "Fishing boat at sea", category: "Operations" },
  { src: "/gallery/image3.jpg", alt: "Processing facility", category: "Facilities" },
  { src: "/gallery/image4.jpg", alt: "Team photo", category: "Team" },
  { src: "/gallery/image5.jpg", alt: "Packaging process", category: "Operations" },
  { src: "/gallery/image6.jpg", alt: "Quality control check", category: "Operations" },
  { src: "/gallery/image7.jpg", alt: "Variety of fish", category: "Products" },
  { src: "/gallery/image8.jpg", alt: "Shrimp close-up", category: "Products" },
  { src: "/gallery/image9.jpg", alt: "Cold storage facility", category: "Facilities" },
]

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const scrollRef = useRef(null)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  const scrollToImage = (index) => {
    scrollRef.current.children[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-12">
        {/* Hero Section with Parallax Effect */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ["0px 0px", "100px 100px"],
                opacity: [0.1, 0.2],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Our Gallery</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Explore our collection of premium seafood and behind-the-scenes glimpses of our operations
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setIsLightboxOpen(true)
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">{image.alt}</h3>
                    <p className="text-sm text-gray-200">{image.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center"
            >
              <button
                className="absolute top-4 right-4 text-white text-xl p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X />
              </button>
              <div className="relative w-full max-w-4xl aspect-[16/9] mb-4">
                <Image
                  src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
                  alt={galleryImages[currentImageIndex].alt}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="text-center text-white mb-4">
                <h3 className="text-xl font-semibold">{galleryImages[currentImageIndex].alt}</h3>
                <p className="text-gray-300">{galleryImages[currentImageIndex].category}</p>
              </div>
              <div className="flex justify-between w-full max-w-4xl px-4">
                <button
                  className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  className="bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="mt-4 w-full max-w-4xl overflow-x-auto" ref={scrollRef}>
                <div className="flex space-x-2">
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-20 flex-shrink-0 cursor-pointer ${
                        index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => {
                        setCurrentImageIndex(index)
                        scrollToImage(index)
                      }}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

