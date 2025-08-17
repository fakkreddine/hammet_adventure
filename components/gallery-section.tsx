"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const galleryImages = [
  {
    id: 1,
    src: "/tunisian-desert-quad-bikes.png",
    alt: "Groupe de quads traversant les dunes du désert tunisien",
    category: "Aventures désert",
    location: "Douz, Tunisie",
    duration: "3h",
    participants: "6 personnes",
    featured: true,
  },
  {
    id: 2,
    src: "/tunisian-desert-quad-bikes-sunset.png",
    alt: "Aventure quad spectaculaire au coucher du soleil",
    category: "Coucher de soleil",
    location: "Hammamet, Tunisie",
    duration: "2h",
    participants: "4 personnes",
    featured: true,
  },
  {
    id: 3,
    src: "/quad-bikes-tunisian-oasis.png",
    alt: "Exploration en quad dans une oasis tunisienne",
    category: "Oasis",
    location: "Tozeur, Tunisie",
    duration: "4h",
    participants: "8 personnes",
  },
  {
    id: 4,
    src: "/tunisia-quad-bikes.png",
    alt: "Circuit quad panoramique avec vues époustouflantes",
    category: "Panoramique",
    location: "Sidi Bou Said, Tunisie",
    duration: "2.5h",
    participants: "5 personnes",
    featured: true,
  },
  {
    id: 5,
    src: "/tunisian-quad-bike-adventure.png",
    alt: "Aventure quad nocturne avec éclairage LED",
    category: "Nocturne",
    location: "Hammamet, Tunisie",
    duration: "2h",
    participants: "4 personnes",
  },
  {
    id: 6,
    src: "/tunisian-quad-biking-family.png",
    alt: "Aventure quad familiale sécurisée",
    category: "Famille",
    location: "Nabeul, Tunisie",
    duration: "1.5h",
    participants: "10 personnes",
  },
  {
    id: 7,
    src: "/quad-biking-training-tunisia.png",
    alt: "Formation professionnelle quad avec instructeur",
    category: "Formation",
    location: "Hammamet, Tunisie",
    duration: "3h",
    participants: "6 personnes",
  },
  {
    id: 8,
    src: "/tunisia-quad-biking.png",
    alt: "Quad extrême dans les montagnes tunisiennes",
    category: "Extrême",
    location: "Zaghouan, Tunisie",
    duration: "5h",
    participants: "4 personnes",
  },
]

const categories = [
  "Tous",
  "Aventures désert",
  "Coucher de soleil",
  "Oasis",
  "Panoramique",
  "Nocturne",
  "Famille",
  "Formation",
  "Extrême",
]

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "Tous" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Galerie d'
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Aventures
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les paysages époustouflants et les moments inoubliables de nos aventures quad à travers la Tunisie
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105 border-0"
                    : "bg-white/80 text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:scale-105 border-amber-200"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border border-amber-200 ${
                  image.featured ? "md:col-span-2 lg:col-span-2 xl:col-span-2" : ""
                } ${index === 0 ? "lg:row-span-2" : ""}`}
                onClick={() => setSelectedImage(image.id)}
              >
                <div
                  className={`${image.featured ? "aspect-[16/10]" : "aspect-[4/3]"} ${index === 0 ? "lg:aspect-[4/5]" : ""} relative overflow-hidden`}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-amber-500/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                      {image.category}
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg leading-tight">{image.alt}</h3>

                      <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{image.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{image.participants}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-6xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const currentImage = galleryImages.find((img) => img.id === selectedImage)
                  return currentImage ? (
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-2/3">
                        <img
                          src={currentImage.src || "/placeholder.svg"}
                          alt={currentImage.alt}
                          className="w-full h-64 lg:h-96 object-cover"
                        />
                      </div>
                      <div className="lg:w-1/3 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                        <div className="space-y-4">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                            {currentImage.category}
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900">{currentImage.alt}</h3>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin className="w-5 h-5 text-amber-600" />
                              <span className="font-medium">{currentImage.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-5 h-5 text-amber-600" />
                              <span className="font-medium">Durée: {currentImage.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Users className="w-5 h-5 text-amber-600" />
                              <span className="font-medium">Jusqu'à {currentImage.participants}</span>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                            Réserver cette aventure
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null
                })()}

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-gray-600 hover:bg-gray-100 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à vivre votre propre aventure?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers d'aventuriers qui ont découvert la beauté de la Tunisie à travers nos excursions
              quad exceptionnelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
              >
                Réserver maintenant
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                Voir tous les circuits
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
