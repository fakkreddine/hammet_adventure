"use client"

import Image from "next/image"
import { Clock, Users, Star, MapPin } from "lucide-react"

const tours = [
  {
    id: 1,
    title: "Sortie Quad Coucher de Soleil",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-12%20%C3%A0%2023.01.57_b368d909.jpg-w4kn9LADcc6GsZ2wBmzBn0FDPOzz57.jpeg",
    duration: "2 heures",
    capacity: "2 personnes",
    price: "120",
    rating: 4.9,
    reviews: 156,
    location: "Hammamet",
    features: ["Guide professionnel", "Équipement inclus", "Photos offertes"],
  },
  {
    id: 2,
    title: "Aventure Quad Nocturne",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-12%20%C3%A0%2023.02.01_c77c5f91.jpg-zgQ6dBqgqDUSXnYtSt28A1WsTThZzZ.jpeg",
    duration: "2.5 heures",
    capacity: "6 personnes",
    price: "95",
    rating: 4.8,
    reviews: 89,
    location: "Hammamet",
    features: ["Éclairage LED", "Collation incluse", "Vue panoramique"],
  },
  {
    id: 3,
    title: "Quad Découverte Nature",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-12%20%C3%A0%2023.02.08_669303cc.jpg-2wD9WdmxCeOxVmUHooTKzB8iTviMFa.jpeg",
    duration: "3 heures",
    capacity: "1 personne",
    price: "85",
    rating: 4.9,
    reviews: 203,
    location: "Hammamet",
    features: ["Paysages authentiques", "Pause thé", "Certificat souvenir"],
  },
  {
    id: 4,
    title: "Excursion Groupe Panorama",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-12%20%C3%A0%2023.02.03_70675e93.jpg-FecTAfJfUCdjDCEQnEcTpR9X8yr4cC.jpeg",
    duration: "4 heures",
    capacity: "12 personnes",
    price: "150",
    rating: 5.0,
    reviews: 67,
    location: "Hammamet",
    features: ["Déjeuner inclus", "Guide multilingue", "Transport inclus"],
  },
]

export default function ToursSection() {
  return (
    <section id="tours" className="py-20 bg-[#F8FFF8]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="font-serif text-2xl text-[#2D8B57] mb-4">Nos Expériences</h3>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Découvrez Nos Packs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reconnectez-vous avec la nature en explorant des paysages authentiques et préservés. Nos circuits vous
            emmèneront dans des endroits uniques, loin des sentiers battus.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#FFD700] text-[#1B4332] px-3 py-1 rounded-full font-bold text-sm">
                  {tour.price} DT
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="text-[#FFD700]" size={14} fill="currentColor" />
                  <span className="text-sm font-semibold">{tour.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>

                {/* Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{tour.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{tour.location}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  {tour.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(tour.rating) ? "text-[#FFD700] fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({tour.reviews} avis)</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-[#2D8B57] hover:bg-[#228B22] text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Réserver Maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
