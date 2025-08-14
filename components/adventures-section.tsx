import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, MapPin } from "lucide-react"

const adventures = [
  {
    id: 1,
    title: "Sunset Quad Safari",
    location: "Hammamet Desert",
    image: "/hero-sunset-quad.jpg",
    duration: "3 hours",
    groupSize: "2-8 people",
    price: "120",
    rating: 4.9,
    reviews: 156,
    description: "Experience the magic of golden hour riding through Tunisia's stunning desert landscapes.",
  },
  {
    id: 2,
    title: "Night Adventure",
    location: "Hammamet Hills",
    image: "/hero-night-quad.jpg",
    duration: "2.5 hours",
    groupSize: "4-10 people",
    price: "100",
    rating: 4.8,
    reviews: 89,
    description: "Explore under the stars with LED-equipped quads for an unforgettable night experience.",
  },
  {
    id: 3,
    title: "Desert Discovery",
    location: "Hammamet Nature",
    image: "/tour-solo-quad.jpg",
    duration: "4 hours",
    groupSize: "2-12 people",
    price: "150",
    rating: 5.0,
    reviews: 203,
    description: "Discover diverse Tunisian landscapes on this comprehensive adventure tour.",
  },
]

export default function AdventuresSection() {
  return (
    <section id="adventures" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Check out nearest adventures</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing quad adventures in Hammamet with professional guides and top-quality equipment.
          </p>
        </div>

        {/* Featured Adventure */}
        <div className="mb-16">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image src="/hero-group-panorama.jpg" alt="Group Adventure" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl font-bold mb-4">Group Panorama Experience</h3>
                <p className="text-lg mb-6">Join fellow adventurers for breathtaking views</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">Book Now</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Adventure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure) => (
            <div
              key={adventure.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={adventure.image || "/placeholder.svg"}
                  alt={adventure.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1">
                  <span className="font-bold text-green-600">{adventure.price} DT</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{adventure.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{adventure.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{adventure.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{adventure.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{adventure.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{adventure.groupSize}</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                  Book Adventure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
