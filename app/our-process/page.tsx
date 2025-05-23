"use client"

import { useRef, useEffect, ReactNode } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const journeySteps = [
  {
    title: "Veraval Harbor",
    description:
      "Our journey begins at the bustling Veraval Harbor, where the freshest catch is brought in daily by local fishermen. This historic port, known for its rich maritime heritage, serves as the starting point for our premium seafood products.",
    image: ["/images/process/veraval.jpg"],
    imageLabel: ["Veraval Harbor View"]
  },
  {
    title: "Raw Material Receiving",
    description:
      "As the catch arrives at our facility, our expert quality control team meticulously inspects each batch. Only the finest specimens meeting our strict quality standards move forward in the process, ensuring that we start with the best raw materials.",
    image: ["/images/process/raw_mat.jpg"],
    imageLabel: ["Raw Material Receiving Section"]
  },
  {
    title: "Processing",
    description:
      "In our state-of-the-art processing facility, skilled workers clean and prepare the seafood with precision. Using both traditional techniques and modern technology, we ensure that each product is handled with care to maintain its quality and freshness.",
    image: ["/images/process/processing.jpg"],
    imageLabel: ["Seafood Processing Area"]
  },
  {
    title: "IQF Section",
    description:
      "We employ advanced freezing methods like Individual Quick Freezing (IQF) to lock in the flavor and nutritional value of our seafood. This process ensures that the product remains in pristine condition from our facility to your plate.",
    image: ["/images/process/IQF(1).jpg", "/images/process/IQF(2).jpg"],
    imageLabel: ["IQF 1", "IQF 2"]
  },
  {
    title: "Freezing and Packaging",
    description: `The most important aspect of frozen seafood is the freezing process, which we refer to as the 2Ts: Time and Temperature. Fresh seafood must be frozen as quickly and efficiently as possible to ensure the most succulent final product.

We have ample freezing capacity and employ some of the best freezing technologies to preserve freshness and quality.

Our freezing capacity includes 8 units of Air Blast Freezers with a capacity of 80 Metric Tons/day, 2 units of Plate Contact Freezers with a capacity of 20 Metric Tons/day, and 2 unit of IQF (Individual Quick Freezing) with a capacity of 20 Metric Tons/day.

These advanced freezing systems allow us to maintain the highest quality standards throughout our freezing and packaging process.`,

    image: ["/images/process/freezing.jpg"],
    imageLabel: ["Freezing Section"]
  },
  {
    title: "Cold Storage",
    description:
      "We operate three state-of-the-art cold storage facilities with a combined capacity of 3500 Metric Tons. These facilities are equipped with the latest mobile racking and stock tracking technologies, ensuring optimal storage and inventory management. This advanced setup allows us to efficiently manage large volumes of stock, providing our customers with a reliable and consistent supply of products. The enhanced storage capacity and tracking systems are essential in maintaining the quality and availability of our products.",
    image: ["/images/process/cold_storage.jpg"],
    imageLabel: ["Cold Storage Facility"]
  },
  {
    title: "Quality Assurance And Quality Control",
    description:
      "We have an in-house, fully equipped laboratory staffed with government-approved technologists to conduct rigorous checks, ensuring our hygiene standards and quality controls meet the requirements of all international markets. Winsor World Exports strictly adheres to HACCP (Hazard Analysis Critical Control Points), guaranteeing traceability for every product. Additionally, we operate an industrial-grade reverse osmosis (R.O.) water plant, ensuring a constant supply of clean water and tube ice wherever needed, further maintaining the highest levels of hygiene and product quality.",
    image: ["/images/process/RO.jpg", "/images/process/quality_assu.jpg"],
    imageLabel: ["RO Water Plant", "Tube Ice Plant"]
  },
  {
    title: "Distribution",
    description:
      "Once our seafood products meet our rigorous quality standards, they are carefully packaged to preserve their freshness and flavor. Leveraging an extensive and well-coordinated logistics network, we ensure timely delivery to our clients across various countries, including Far East, Middle East, Europe, the USA, and beyond. Each step of the distribution process is meticulously managed to comply with international shipping regulations and maintain the integrity of the products. With state-of-the-art cold storage and transportation systems, we deliver seafood that meets the expectations of global markets, ensuring customer satisfaction and strengthening our reputation as a trusted supplier in the seafood industry.",
    image: ["/images/process/distribution.jpg"],
    imageLabel: ["Distribution Center"]
  }
]

interface ParallaxSectionProps {
  children: ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <motion.div ref={ref} style={{ y }} className="relative">
      {children}
    </motion.div>
  )
}

export default function OurJourney() {
  return (
    <div className="relative bg-[#f8fafc] flex flex-col">
      <Header />
      <main className="relative z-0 pb-16">
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Our Process</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                From meticulously inspected raw materials to expertly crafted final products, our process ensures
                unparalleled quality at every step
              </p>
            </motion.div>
          </div>
        </section>

        {/* Journey Steps */}
        {journeySteps.map((step, index) => (
          <ParallaxSection key={index}>
            <section className={`py-24 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              <div className="container mx-auto px-4">
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
                >
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="relative w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
                    >                     
                     <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="h-full w-full"
                  >
                      {Array.isArray(step.image) ? step.image.map((image, imageIndex) => (
                        <SwiperSlide key={imageIndex} className="relative">
                          <div className="h-full w-full relative">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${step.title} - Image ${imageIndex + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 hover:scale-110"
                            />
                            {step.imageLabel && step.imageLabel[imageIndex] && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                                {step.imageLabel[imageIndex]}
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      )) : (
                        <SwiperSlide>
                          <div className="h-full w-full relative">
                            <Image
                              src={step.image || "/placeholder.svg"}
                              alt={`${step.title} - Image 1`}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 hover:scale-110"
                            />
                            {step.imageLabel && step.imageLabel[0] && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                                {step.imageLabel[0]}
                              </div>
                            )}
                          </div>
                        </SwiperSlide>
                      )}
                    </Swiper>
                    </motion.div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-4xl font-bold mb-6 font-sans text-gray-800">{step.title}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </ParallaxSection>
        ))}
      </main>
    </div>
  )
}