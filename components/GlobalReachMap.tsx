"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Destination {
  name: string
  coordinates: [number, number]
  region: string
}

const destinations: Destination[] = [
  // North America
  { name: "United States", coordinates: [150, 120], region: "North America" },
  { name: "Canada", coordinates: [150, 80], region: "North America" },

  // Europe
  { name: "United Kingdom", coordinates: [400, 100], region: "Europe" },
  { name: "Netherlands", coordinates: [420, 90], region: "Europe" },
  { name: "France", coordinates: [400, 120], region: "Europe" },
  { name: "Italy", coordinates: [440, 130], region: "Europe" },
  { name: "Spain", coordinates: [380, 140], region: "Europe" },
  { name: "Portugal", coordinates: [360, 150], region: "Europe" },

  // Asia
  { name: "China", coordinates: [650, 150], region: "Asia" },
  { name: "Japan", coordinates: [720, 130], region: "Asia" },
  { name: "South Korea", coordinates: [690, 140], region: "Asia" },
  { name: "Vietnam", coordinates: [650, 200], region: "Asia" },
  { name: "Thailand", coordinates: [630, 210], region: "Asia" },
  { name: "Malaysia", coordinates: [630, 240], region: "Asia" },
  { name: "Singapore", coordinates: [630, 260], region: "Asia" },
  { name: "Indonesia", coordinates: [650, 280], region: "Asia" },
  { name: "Bangladesh", coordinates: [600, 180], region: "Asia" },
  { name: "Sri Lanka", coordinates: [580, 230], region: "Asia" },

  // Middle East
  { name: "UAE", coordinates: [520, 170], region: "Middle East" },

  // Africa
  { name: "Tunisia", coordinates: [440, 160], region: "Africa" },
  { name: "West Africa", coordinates: [380, 200], region: "Africa" },
  { name: "South Africa", coordinates: [460, 300], region: "Africa" },

  // Oceania
  { name: "Australia", coordinates: [700, 300], region: "Oceania" },
]

// Company location (Veraval, Gujarat, India)
const companyLocation: [number, number] = [550, 180]

export default function GlobalReachMap() {
  const [activeDestinations, setActiveDestinations] = useState<string[]>([])
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  useEffect(() => {
    // Animate destinations in sequence by region
    const regions = Array.from(new Set(destinations.map((d) => d.region)))
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < regions.length) {
        const region = regions[currentIndex]
        setActiveDestinations((prev) => [
          ...prev,
          ...destinations.filter((d) => d.region === region).map((d) => d.name),
        ])
        currentIndex++
      } else {
        currentIndex = 0
        setActiveDestinations([])
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getPathVariants = (destination: Destination) => ({
    initial: {
      pathLength: 0,
      opacity: 0,
    },
    animate: {
      pathLength: activeDestinations.includes(destination.name) ? 1 : 0,
      opacity: activeDestinations.includes(destination.name) ? 1 : 0,
    },
  })

  const getDotVariants = (destination: Destination) => ({
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: activeDestinations.includes(destination.name) ? 1 : 0,
      opacity: activeDestinations.includes(destination.name) ? 1 : 0,
    },
  })

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-6">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        style={{ background: "url(/world-map-bg.png) center/cover" }}
      >
        {/* Company Location Marker */}
        <motion.circle
          cx={companyLocation[0]}
          cy={companyLocation[1]}
          r="6"
          className="fill-blue-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <text x={companyLocation[0] + 10} y={companyLocation[1] - 10} className="fill-gray-700 text-sm font-medium">
          Winsor World Export, Veraval, India
        </text>

        {/* Export Routes and Destination Markers */}
        {destinations.map((destination, index) => {
          const isActive = activeDestinations.includes(destination.name)
          const isRegionHovered = hoveredRegion === destination.region

          return (
            <g
              key={destination.name}
              onMouseEnter={() => setHoveredRegion(destination.region)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              {/* Curved path from company to destination */}
              <motion.path
                d={`M ${companyLocation[0]},${companyLocation[1]} Q ${
                  (companyLocation[0] + destination.coordinates[0]) / 2
                },${
                  Math.min(companyLocation[1], destination.coordinates[1]) - 50
                } ${destination.coordinates[0]},${destination.coordinates[1]}`}
                fill="none"
                stroke={isRegionHovered ? "#2563eb" : "#60a5fa"}
                strokeWidth={isRegionHovered ? "3" : "2"}
                variants={getPathVariants(destination)}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              />

              {/* Destination marker */}
              <motion.circle
                cx={destination.coordinates[0]}
                cy={destination.coordinates[1]}
                r="4"
                className={`${isRegionHovered ? "fill-blue-600" : "fill-blue-400"}`}
                variants={getDotVariants(destination)}
                initial="initial"
                animate="animate"
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5,
                }}
              />

              {/* Destination label */}
              <motion.text
                x={destination.coordinates[0] + 10}
                y={destination.coordinates[1] + 5}
                className={`text-xs font-medium ${isRegionHovered ? "fill-gray-900" : "fill-gray-600"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {destination.name}
              </motion.text>
            </g>
          )
        })}
      </svg>

      {/* Region Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {Array.from(new Set(destinations.map((d) => d.region))).map((region) => (
          <div
            key={region}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              hoveredRegion === region ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
            }`}
            onMouseEnter={() => setHoveredRegion(region)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {region}
          </div>
        ))}
      </div>
    </div>
  )
}

