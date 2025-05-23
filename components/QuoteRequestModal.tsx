import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import PhoneInput from "react-phone-input-2"
import { submitContactForm } from "../app/actions/contact"

interface QuoteRequestModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export default function QuoteRequestModal({ isOpen, onClose, productName }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    message: "",
    productName: productName, // Initialize with the passed productName
  })
  const [formStatus, setFormStatus] = useState<{ success: boolean; message: string } | null>(null)

  // Update formData when productName prop changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, productName }))
  }, [productName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handlePhoneChange = (value: string, country: any, formattedValue: string) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: formattedValue,
      country: country.name,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Ensure productName is included in submission
    const submissionData = {
      ...formData,
      productName: productName, // Explicitly set productName again
    }

    const result = await submitContactForm(submissionData)
    setFormStatus(result)

    if (result.success) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        quantity: "",
        message: "",
        productName: productName,
      })
      setTimeout(() => {
        onClose()
        setFormStatus(null)
      }, 3000)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Request Quote for {productName}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(value, country, event, formattedValue) => {
                    handlePhoneChange(value, country, formattedValue)
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    className:
                      "!w-full !h-10 !pl-[72px] !pr-[12px] !rounded-md !text-base border border-gray-300 focus:ring-2 focus:ring-blue-500",
                  }}
                  containerClass="!w-full"
                  buttonClass="!absolute !left-0 !top-0 !bottom-0 !border-0 !rounded-l-md !bg-gray-50 !px-2 !border-r border-gray-300"
                  dropdownClass="!bg-white !shadow-lg !rounded-md !border !border-gray-200 !mt-1"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="e.g., 500 kgs"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              {/* Hidden input for product name */}
              <input type="hidden" name="productName" value={productName} />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Quote Request
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

