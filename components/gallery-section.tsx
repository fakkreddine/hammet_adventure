"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/hero-sunset-quad.jpg",
    alt: "Aventure quad au coucher du soleil avec groupe",
    category: "Coucher de soleil",
    featured: true,
  },
  {
    id: 2,
    src: "/hero-night-quad.jpg",
    alt: "Aventure quad nocturne sous la lune",
    category: "Aventures nocturnes",
    featured: true,
  },
  {
    id: 3,
    src: "/tour-solo-quad.jpg",
    alt: "Quad solo dans le paysage méditerranéen",
    category: "Aventures solo",
  },
  {
    id: 4,
    src: "/hero-group-panorama.jpg",
    alt: "Vue panoramique de groupe sur Hammamet",
    category: "Tours de groupe",
    featured: true,
  },
]

const categories = ["Tous", "Coucher de soleil", "Aventures nocturnes", "Tours de groupe", "Aventures solo"]

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const filteredImages =
    selectedCategory === "Tous" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Galerie d'aventures</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les paysages époustouflants et les moments inoubliables de nos aventures quad à Hammamet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
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
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 hover:scale-105"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl elegant-hover ${
                  image.featured ? "md:col-span-2 lg:col-span-1" : ""
                } ${index === 0 ? "lg:row-span-2" : ""}`}
                onClick={() => setSelectedImage(image.id)}
              >
                <div
                  className={`${image.featured ? "aspect-[4/3]" : "aspect-square"} ${index === 0 ? "lg:aspect-[3/4]" : ""}`}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="font-bold text-lg mb-1">{image.category}</p>
                    <p className="text-sm opacity-90">{image.alt}</p>
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
                className="relative max-w-5xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const currentImage = galleryImages.find((img) => img.id === selectedImage)
                  return currentImage ? (
                    <img
                      src={currentImage.src || "/placeholder.svg"}
                      alt={currentImage.alt}
                      className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    />
                  ) : null
                })()}

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
