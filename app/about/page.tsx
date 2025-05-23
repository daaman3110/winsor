"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Anchor,
  Globe,
  Award,
  Fish,
  Leaf,
  Ship,
  Check,
  Shield,
  Truck,
  Users,
  MapPin,
  Waves,
  Building,
  TrendingUp,
} from "lucide-react"
import Header from "../../components/Header"
import ExportDestinations from "../../components/ExportDestinations"
import Link from "next/link"
import GlobalReachMap from "../../components/GlobalReachMap"

const teamMembers = [
  {
    name: "Soyab Kapadiya",
    role: "Founder & Managing Partner",
    image: "/soyeb-kapadia.jpg",
    bio: "Soyab's strategic vision and operational expertise drive Winsor World Export forward, expanding our global footprint",
  },
  {
    name: "Shafi Kapadiya",
    role: "Co-Founder & Partner",
    image: "/shafi-kapadia.jpg",
    bio: "With his keen eye for quality and deep relationships with suppliers, Shafi ensures only the finest seafood makes it to our customers.",
  },
  {
    name: "Amit Patel",
    role: "Marketing Manager",
    image: "/amit-patel.jpg",
    bio: "Amit's understanding of international markets and customer needs helps us tailor our offerings to diverse global preferences.",
  },
  {
    name: "Bilal Kapadiya",
    role: "Operations Representative",
    image: "/bilal-kapadia.jpg",
    bio: "Bilal serves as a pivotal Operations Representative at Winsor World Export, ensuring smooth and efficient management of daily operations. ",
  },
]

const timelineEvents = [
  {
    year: "Early Years",
    title: "Roots in Veraval",
    description:
      "Brothers Soyab and Shafi immerse themselves in the vibrant world of seafood, learning the intricacies of the fishing industry.",
    icon: Waves,
    position: "left",
  },
  {
    year: "1995",
    title: "Local Pioneers",
    description:
      "The brothers begin supplying premium seafood to local markets, quickly gaining a reputation for unparalleled quality.",
    icon: Building,
    position: "right",
  },
  {
    year: "2005",
    title: "Birth of Winsor World Export",
    description:
      "Recognizing global opportunities, Soyab and Shafi establish Winsor World Export, aiming to bring Indian seafood to the world stage.",
    icon: Ship,
    position: "left",
  },
  {
    year: "2011",
    title: "International Expansion",
    description:
      "Strategic partnerships formed across Europe, Asia, and North America, marking the company's entry into major global markets.",
    icon: TrendingUp,
    position: "right",
  },
  {
    year: "Today",
    title: "Industry Leaders",
    description:
      "Handling over approximately $15 Million of seafood annually, Winsor World Exports stands as a beacon of quality and innovation in the global seafood industry.",
    icon: Award,
    position: "left",
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main>
        {/* Hero Section */}
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
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Tale of Two Brothers and the Sea</h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Our legacy in the seafood industry is built on trust, quality, and innovation, setting the standard for
                fresh and responsibly sourced seafood around the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-sans text-gray-800">
              Our Journey: From Local Shores to Global Excellence
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-100"></div>

              {/* Timeline Events */}
              <div className="relative">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className={`flex items-center mb-16 ${event.position === "left" ? "flex-row-reverse" : ""}`}
                  >
                    {/* Content */}
                    <div className={`w-5/12 ${event.position === "left" ? "text-right pr-8" : "pl-8"}`}>
                      <div className="text-blue-600 font-bold mb-1">{event.year}</div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>

                    {/* Icon */}
                    <div className="w-2/12 flex justify-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white relative z-10">
                        <event.icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vision Statement */}
            <div className="mt-16 text-center max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                Today, Winsor World Export stands as a testament to the vision of Soyab and Shafi Kapadiya. Their journey
                from local fish suppliers to global seafood exporters embodies the spirit of innovation, quality, and
                unwavering commitment to excellence that defines our company.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-sans text-gray-800">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 font-sans">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Global Reach</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From our base in Veraval, Gujarat, we export premium seafood products to major markets worldwide,
                serving customers across multiple continents with excellence and reliability.
              </p>
            </div>
            <GlobalReachMap />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-white rounded-xl shadow-md"
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">30+</h3>
                <p className="text-gray-600">Countries Served</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 bg-white rounded-xl shadow-md"
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">200+</h3>
                <p className="text-gray-600">Global Partners</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 bg-white rounded-xl shadow-md"
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">7000+</h3>
                <p className="text-gray-600">Tons Exported Yearly</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 bg-white rounded-xl shadow-md"
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">25+</h3>
                <p className="text-gray-600">Years of Excellence</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Certifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Certifications</h2>
            <img src="/images/process/certificate.jpg" alt="Certifications" className="mx-auto" />
          </div>
        </section>
      </main>
    </div>
  )
}

