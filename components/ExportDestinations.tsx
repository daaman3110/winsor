import Image from 'next/image'

const exportDestinations = [
  { name: 'USA', flag: '/flags/usa.png' },
  { name: 'China', flag: '/flags/china.png' },
  { name: 'Japan', flag: '/flags/japan.png' },
  { name: 'Vietnam', flag: '/flags/vietnam.png' },
  { name: 'South Korea', flag: '/flags/south-korea.png' },
  { name: 'Australia', flag: '/flags/australia.png' },
]

export default function ExportDestinations() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center font-serif">Our Global Reach</h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          OceanTreasures proudly exports premium seafood to discerning customers around the world, including:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {exportDestinations.map((destination) => (
            <div key={destination.name} className="flex flex-col items-center">
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={destination.flag}
                  alt={`${destination.name} flag`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full shadow-md"
                />
              </div>
              <span className="text-lg font-semibold text-gray-800">{destination.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

