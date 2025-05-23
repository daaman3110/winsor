"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Fish, Package, Ruler, Search, Shell, Waves, X, Eye } from "lucide-react"
import Image from "next/image"
import Header from "../../components/Header"
import QuoteRequestModal from "../../components/QuoteRequestModal"

interface Product {
  id: number
  name: string
  category: string
  image: string
  description?: string
  packing: string
  size: string
}

const categories = [
  { id: "all", name: "All Products", icon: Fish },
  { id: "fishes", name: "Fishes", icon: Fish },
  { id: "shrimp", name: "Shrimp", icon: Shell },
  { id: "cephalopods", name: "Cephalopods", icon: Waves },
]

const allProducts = [
  {
    id: 1,
    name: "Horse Mackerel",
    category: "Fishes",
    image: "/images/products/horse_mackerel.jpg",
    packing: "10kgs shatter",
    size: "1/2, 2/4, 4/6, 6/8, 8/10",
  },
  {
    id: 2,
    name: "Queen Fish",
    category: "Fishes",
    image: "/images/products/queenfish.jpg",
    packing: "Running Weight in Polybag Packing",
    size: "300gms/500gms, 500gms/1kgs, 1kgs/2kgs, 2kgs/3kgs, 3kgs/5kgs, 5kgs/up",
  },
  {
    id: 3,
    name: "Silver Crocker",
    category: "Fishes",
    image: "/images/products/silver_crocker.jpg",
    packing: "10kgs Packing",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/up",
  },
  {
    id: 4,
    name: "Indian Mackerel",
    category: "Fishes",
    image: "/images/products/indian_mackerel.jpg",
    packing: "10kgs IQF/Blast Freezing",
    size: "2/4, 4/6, 6/8, 8/10, 10/12, 12/15, 15/up",
  },
  {
    id: 5,
    name: "Barracuda",
    category: "Fishes",
    image: "/images/products/baracuda.jpg",
    packing: "10kgs IWP Packing",
    size: "300gms/500gms, 500gms/1kg, 1kgs/2kgs, 2kgs/3kgs, 3kgs/5kgs, 5kgs/up",
  },
  {
    id: 6,
    name: "Grouper",
    category: "Fishes",
    image: "/images/products/s_grouper.jpg",
    packing: "10kgs Block/IWP",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up, 1kgs/2kgs, 2kgs/3kgs, 3kgs/5kgs, 5kgs/10kgs, 10kgs/up",
  },
  {
    id: 7,
    name: "Sole Fish",
    category: "Fishes",
    image: "/images/products/sole_fish.jpg",
    packing: "10kgs Packing",
    size: "U/50gms, 50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms",
  },
  {
    id: 8,
    name: "Ribbon Fish",
    category: "Fishes",
    image: "/images/products/ribbon_fish.jpg",
    packing: "10kgs Packing",
    size: "100gms/200gms, 200gms/300gms, 300gms/400gms, 400gms/700gms, 700gms/up",
  },
  {
    id: 9,
    name: "Tilapia",
    category: "Fishes",
    image: "/images/products/tilapia.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 400gms/600gms, 500gms/800gms, 800gms/up",
  },
  {
    id: 10,
    name: "Black Pomfret",
    category: "Fishes",
    image: "/images/products/black_pomfret.jpg",
    packing: "10kgs IWP Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 11,
    name: "Silver Pomfret",
    category: "Fishes",
    image: "/images/products/silver_pomfret.jpg",
    packing: "10kgs IWP Packing",
    size: "100gms/200gms, 200gms/300gms, 300gms/400gms, 400gms/500gms, 500gms/600gms, 600gms/700gms, 700gms/800gms, 800gms/up",
  },
  {
    id: 12,
    name: "Cat Fish",
    category: "Fishes",
    image: "/images/products/catfish.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 13,
    name: "Katla Fish",
    category: "Fishes",
    image: "/images/products/katlafish.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/1000gms, 1000gms/2000gms, 2000gms/3000gms",
  },
  {
    id: 14,
    name: "Skipjack Tuna",
    category: "Fishes",
    image: "/images/products/skipjact_tuna.jpg",
    packing: "Running Weight in Polybag",
    size: "1kgs/2kgs, 2kgs/4kgs, 4kgs/10kgs",
  },
  {
    id: 15,
    name: "Bonito Tuna",
    category: "Fishes",
    image: "/images/products/bonito_tuna.jpg",
    packing: "10kgs Packing",
    size: "500gms/1kgs, 1kgs/2kgs, 2kgs/3kgs",
  },
  {
    id: 16,
    name: "Yellowfin Tuna",
    category: "Fishes",
    image: "/images/products/yellowfin_tuna.jpg",
    packing: "Running Weight in Polybag Packing",
    size: "2kgs/4kgs, 4kgs/10kgs, 10kgs/20kgs, 20kgs/30kgs, 30kgs/up",
  },
  {
    id: 17,
    name: "Leather Jacket",
    category: "Fishes",
    image: "/images/products/leather_jacket.jpg",
    packing: "10kgs Packing",
    size: "20gms/50gms, 50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 18,
    name: "Rohu Fish",
    category: "Fishes",
    image: "/images/products/rohufish.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/1000gms, 1000gms/2000gms, 2000gms/3000gms",
  },
  {
    id: 19,
    name: "Reefcod",
    category: "Fishes",
    image: "/images/products/reefcod.jpg",
    packing: "10kgs Packing",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 20,
    name: "Yellow Croacker",
    category: "Fishes",
    image: "/images/products/yellow_crocker.jpg",
    packing: "10kgs Packing",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/up",
  },
  {
    id: 21,
    name: "Mrigal",
    category: "Fishes",
    image: "/images/products/mrigal.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/1000gms, 1000gms/2000gms, 2000gms/3000gms",
  },
  {
    id: 22,
    name: "Red Snapper",
    category: "Fishes",
    image: "/images/products/king_snapper.jpg",
    packing: "10kgs Packing",
    size: "500gms/1kgs, 1kgs/2kgs, 2kgs/3kgs, 3kgs/5kgs, 5kgs/up",
  },
  {
    id: 23,
    name: "Grey Mullet",
    category: "Fishes",
    image: "/images/products/redmullet.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 24,
    name: "Big Mouth Croacker Fish",
    category: "Fishes",
    image: "/images/products/bigmouth_crocker.jpg",
    packing: "10kgs Packing",
    size: "100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 25,
    name: "Eel Fish",
    category: "Fishes",
    image: "/images/products/eelfish.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 26,
    name: "Lizard Fish",
    category: "Fishes",
    image: "/images/products/lizardfish.jpg",
    packing: "10kgs Packing",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 27,
    name: "Tiger Tooth Croaker",
    category: "Fishes",
    image: "/images/products/tt_croacker.jpg",
    packing: "10kgs Packing",
    size: "100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 28,
    name: "Japanesh Threadfin Bream",
    category: "Fishes",
    image: "/images/products/jtb.jpg",
    packing: "10kgs Packing",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/up",
  },
  {
    id: 29,
    name: "Spotted Grouper",
    category: "Fishes",
    image: "/images/products/red_grouper.jpg",
    packing: "10kgs Block/IWP",
    size: "50gms/100gms, 100gms/200gms, 200gms/300gms, 300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up, 1kgs/2kgs, 2kgs/3kgs, 3kgs/5kgs, 5kgs/10kgs, 10kgs/up",
  },
  {
    id: 30,
    name: "Indian Salmon",
    category: "Fishes",
    image: "/images/products/indian_salmon.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up",
  },
  {
    id: 31,
    name: "Bombay Duck",
    category: "Fishes",
    image: "/images/products/bombay_duck.jpg",
    packing: "4X5 kgs/ IQF Packing",
    size: "50gms/70gms, 70gms/100gms, 100gms/200gms",
  },
  {
    id: 32,
    name: "String Ray Fish",
    category: "Fishes",
    image: "/images/products/stingray.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/700gms, 700gms/1000gms, 1000gms/up, 2kgs/3kgs, 3kgs/5kgs",
  },
  {
    id: 33,
    name: "Chinese Pomfret",
    category: "Fishes",
    image: "/images/products/chinese_pomfret.jpg",
    packing: "10kgs Packing",
    size: "300gms/500gms, 500gms/800gms, 800gms/1000gms, 1000gms/1200gms, 1200gms/1500gms, 1500gms/2000gms, 2000gms/up",
  },
  {
    id: 34,
    name: "Karikkadi PUD Shrimp",
    category: "Shrimp",
    image: "/images/products/karikkadi_shrimp.jpg",
    packing: "6X2kgs Block/IQF",
    size: "80/100, 100/200, 200/300, 300/500, 500/800, Broken",
  },
  {
    id: 35,
    name: "Red Pud Shrimp",
    category: "Shrimp",
    image: "/images/products/redpud_shrimp.jpg",
    packing: "6X2kgs Block/IQF",
    size: "80/100, 100/200, 200/300, 300/500, 500/800, Broken",
  },
  {
    id: 36,
    name: "Cuttle Fish W/C",
    category: "Cephalopods",
    image: "/images/products/cuttlefish_clean.jpg",
    packing: "10kgs IQF",
    size: "1/2, 2/4, 5/7, 8/12, 13/20, 20/40, 40/60, 60/up",
  },
  {
    id: 37,
    name: "Baby Squid",
    category: "Cephalopods",
    image: "/images/products/baby_squid.jpg",
    packing: "10kgs IQF",
    size: "40/60, 60/80, 80/up, 100/up",
  },
  {
    id: 38,
    name: "Squid Tentacles",
    category: "Cephalopods",
    image: "/images/products/squid_tentacle.jpg",
    packing: "10kgs IQF",
    size: "40/up",
  },
  {
    id: 39,
    name: "Loligo Squid",
    category: "Cephalopods",
    image: "/images/products/squid_whole.jpg",
    packing: "6X2kgs Block/IQF",
    size: "U/3, 3/6, 6/10, 10/20, 20/40",
  },
  {
    id: 40,
    name: "Baby Cuttlefish",
    category: "Cephalopods",
    image: "/images/products/baby_cuttlefish.jpg",
    packing: "4X5kgs Block",
    size: "U/50, 50/100, 100/150, 150/300",
  },
  {
    id: 41,
    name: "Whole Cuttlefish",
    category: "Cephalopods",
    image: "/images/products/cuttlefish_whole.jpg",
    packing: "4X5kgs Block",
    size: "300/500, 500/700, 700/1000, 1000/up",
  },
  {
    id: 42,
    name: "Squid Rings",
    category: "Cephalopods",
    image: "/images/products/squid_ring.jpg",
    packing: "10kgs IQF Packing",
    size: "40/up, Broken",
  },
  {
    id: 43,
    name: "Squid Tube",
    category: "Cephalopods",
    image: "/images/products/squid_tube.jpg",
    packing: "6X2kgs Block/IQF",
    size: "2-4 inch, 3-5 inch, 4-6 inch, 5-8 inch, Broken",
  },
  {
    id: 44,
    name: "Stuffed Squid",
    category: "Cephalopods",
    image: "/images/products/stuffed_squid.jpg",
    packing: "10kgs IQF",
    size: "10/20, 20/40, 40/60",
  },
  {
    id: 45,
    name: "Octopus",
    category: "Cephalopods",
    image: "/images/products/octopus.jpg",
    packing: "4X5kgs Block/IQF",
    size: "10/20, 20/40, 40/60, 60/up, 100gms/300gms, 300gms/500gms, 500gms/up",
  },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    filterProducts(activeCategory, event.target.value)
  }

  const filterProducts = (category: string, search: string = searchTerm) => {
    setActiveCategory(category)
    const filtered = allProducts.filter((product) => {
      const matchesCategory = category === "all" || product.category.toLowerCase() === category.toLowerCase()
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Header />

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">Premium Seafood Selection</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover our extensive range of high-quality seafood products, sourced from the world's finest waters
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full h-12 pl-6 pr-16 rounded-full bg-white/10 text-white placeholder-white border-2 border-white/20 focus:border-white/40 focus:ring-0 backdrop-blur-sm focus:text-white"
                style={{ color: "white" }}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                onClick={() => filterProducts(activeCategory, searchTerm)}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="sticky top-0 z-20 bg-white border-b shadow-sm backdrop-blur-lg bg-white/80">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => filterProducts(category.id)}
                className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  <span className="font-medium text-sm md:text-base">{category.name}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" layout>
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 font-sans"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-2 font-sans">{product.name}</h3>
                      <Button
                        variant="secondary"
                        className="w-full backdrop-blur-sm bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    
                  </div>

                  {/* Default Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <h3 className="relative text-xl font-bold text-white mb-1 font-sans">{product.name}</h3>
                    <p className="relative text-sm text-gray-200">{product.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto font-sans relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-white/80 text-gray-800 rounded-full p-2 hover:bg-white transition-colors z-10"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="h-6 w-6" />
              </button>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative w-full h-64 md:h-full">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-sans">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 font-sans">Packing</h3>
                        <p className="text-gray-600">{selectedProduct.packing}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                      <Ruler className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 font-sans">Available Sizes</h3>
                        <p className="textgray-600">{selectedProduct.size}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 text-lg rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setIsQuoteModalOpen(true)
                    }}
                  >
                    Request Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={selectedProduct ? selectedProduct.name : ""}
      />
    </div>
  )
}

