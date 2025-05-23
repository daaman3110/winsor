"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Anchor, Globe, Award, Fish, Leaf, Ship, Check, Shield, Truck } from "lucide-react"
import Header from "../components/Header"
import { useRef, useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { submitContactForm } from "./actions/contact"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface ContactFormData {
  name: string
  email: string
  message: string
  phone: string
  country: string
  quantity: string
  productName: string
}

export default function Home() {
  const productsRef = useRef<HTMLElement>(null)
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string } | null>(null)
  const controls = useAnimation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 },
    }))
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.log("Auto-play was prevented. This is normal on some devices.", error)
      })
    }
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [controls, isMobile])
     

    

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handlePhoneChange = (value: string, country: any) => {
    setSelectedCountry(country.name)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data: ContactFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      phone: formData.get('phone') as string,
      country: selectedCountry || formData.get('country') as string,
      quantity: formData.get('quantity') as string,
      productName: formData.get('productName') as string,
    }
    const result = await submitContactForm(data)
    setFormStatus(result)
    if (result.success) {
      event.currentTarget.reset()
      setSelectedCountry("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-background">
          <video key="mobile-video" ref={videoRef} autoPlay loop muted playsInline className="video-background mobile-fallback" src="ocean(3).mp4">
          </video>
          {!isMobile && (     
          <video ref={videoRef} autoPlay loop muted playsInline className="video-background">
          <source src="/ocean(3).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>)}</div>
        <div
            className="fallback-background"
            style={{
              backgroundImage: `url('/back_ocean.png')`,
              opacity: isMobile ? 1 : 0,
            }}
          >
        </div>
 
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white p-8 rounded-lg">
          <div className="mb-8">
            <Image src="/actual_logo.png" alt="Winsor World Export Logo" width={300} height={300} className="mx-auto" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down font-sans drop-shadow-lg">
            Winsor World Export
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up drop-shadow-md">
            Premium exports from the world's finest oceans
          </p>
          <button
            onClick={scrollToProducts}
            className="bg-white text-gray-800 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-100 inline-flex items-center"
          >
            Explore Our Selection <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        ref={productsRef}
        className="relative py-24 bg-gradient-to-b from-blue-900 to-blue-800"
        style={{
          backgroundImage: 'url("/seafood-pattern.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-800/95"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-down font-sans">
              Our Premium Categories
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our selection of premium seafood, sourced from the world's finest waters and processed to
              perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Fishes",
                image: "/images/ribbonfish(1).png",
                description: "From succulent salmon to delicate cod, our fish selection offers a world of flavors.",
              },
              {
                name: "Shrimps",
                image: "/images/shrimp_images.jpg",
                description: "Juicy, tender shrimp in various sizes, perfect for any culinary creation.",
              },
              {
                name: "Cephalopods",
                image: "/images/squid4k.png",
                description: "Explore our range of squid, octopus, and cuttlefish for exquisite seafood dishes.",
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl bg-gray-900/50 backdrop-blur-sm"
              >
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white transform translate-y-8 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-center text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  <Link
                    href={`/products#${category.name.toLowerCase()}`}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                  >
                    Explore {category.name}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center hover:bg-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              View All Products <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-blue-50 to-white text-gray-800 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-sans text-blue-900">About Winsor World Export</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering premium seafood with a commitment to quality and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-blue-500 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Quality Assurance</h3>
                </div>
                <p className="text-gray-600">
                  Our rigorous standards and meticulous processes ensure that every shipment meets the highest quality
                  benchmarks, delivering excellence to your table.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Leaf className="w-8 h-8 text-green-500 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Sustainability</h3>
                </div>
                <p className="text-gray-600">
                  We're committed to preserving marine ecosystems for future generations, partnering with responsible
                  fisheries and promoting sustainable practices.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              <Image
                src="/sustainability.jpg"
                alt="Premium Seafood Display"
                width={600}
                height={400}
                objectFit="cover"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="text-3xl font-bold">25+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Our Commitment</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Globe, title: "Global Reach" },
                { icon: Anchor, title: "Rich Heritage" },
                { icon: Truck, title: "Advanced Logistics" },
                { icon: Fish, title: "Premium Selection" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <item.icon className="w-12 h-12 text-blue-500 mb-2" />
                  <span className="text-gray-700 font-semibold">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/about"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 inline-flex items-center hover:bg-blue-700 shadow-md hover:shadow-lg hover:scale-105 transform"
            >
              Learn More About Us <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-down font-sans">
            Get in Touch
          </h2>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 animate-fade-in-left">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"in"}
                    inputProps={{
                      name: "phone",
                      required: true,
                      className:
                        "!w-full !h-10 !pl-[72px] !pr-[12px] !rounded-md !text-base border border-gray-300 focus:ring-2 focus:ring-blue-500",
                    }}
                    containerClass="!w-full"
                    buttonClass="!absolute !left-0 !top-0 !h-full !border-0 !rounded-l-md !bg-gray-50 !px-2 !border-r !border-gray-300"
                   dropdownClass="!bg-white !shadow-lg !rounded-md !border !border-gray-200 !mt-1"
                    onChange={handlePhoneChange}
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2 text-gray-700">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                    required
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
    <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Eswatini">Eswatini </option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Holy See">Holy See</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea (North)">Korea (North)</option>
    <option value="Korea (South)">Korea (South)</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Laos">Laos</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestine State">Palestine State</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-gray-800 transition-all duration-300"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-700"
                >
                  Send Message
                </button>
              </form>
              {formStatus && (
                <div
                  className={`mt-4 p-4 rounded-md ${
                    formStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/2 lg:pl-12 animate-fade-in-right">
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <span className="text-gray-600">Plot 801,802/1/2 GIDC Estate, Veraval, 362269, Gujarat, India</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">
                  <p className="text-gray-600">Soyab Kapadiya : +91 92273 39111</p>
                  <p className="text-gray-600">Shafi Kapadiya : +91 92273 39333</p>
                  <p className="text-gray-600">Amit Patel : +91 97370 00224</p>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">winsorworldexport@gmail.com</span>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Business Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              </div>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.0411834138326!2d70.38813667529772!3d20.903627080714568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd330bee2ff389%3A0xf3adc666c4991149!2sWinsor%20world%20export!5e1!3m2!1sen!2sin!4v1737530035298!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center">
                <span className="font-sans">Winsor World Export</span>
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; 2025 Winsor World Export. All rights reserved.</p>
            <p className="mt-2 text-gray-400">
              Developed by:{" "}
              <a href="mailto:daamanpatel4@gmail.com" className="hover:text-blue-400 transition-colors">
                Daaman Amit Patel
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

