"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: number
  nom: string
  description: string
  duree: string | number
  nbMaxPersonne: string | number
  nbMinPersonne: string | number
  trancheAge?: string
  prix?: string | number
  type: string
  location?: string
  images: string[]
  featured?: boolean
}

export default function GallerySection() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  const [activities, setActivities] = useState<Activity[]>([])
  const [categories, setCategories] = useState<string[]>(["Tous"])
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/activities`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data: Activity[] = await res.json()
        console.log("Activities fetched:", data)
        setActivities(data)

        // Extract unique categories dynamically
        const uniqueCategories = Array.from(new Set(data.map((a) => a.type)))
        setCategories(["Tous", ...uniqueCategories])
        setError(null)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError("Impossible de charger les activités. Veuillez réessayer plus tard.")
      }
    }
    fetchActivities()
  }, [API_URL])

  const filteredActivities =
    selectedCategory === "Tous"
      ? activities
      : activities.filter((a) => a.type === selectedCategory)

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Heading */}
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

        {/* Category buttons */}
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

        {/* Activity grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.03, y: -10 }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border border-amber-200"
                onClick={() => setSelectedActivity(activity.id)}
              >
                <div className="relative">
                  <img
                    src={activity.images.length > 0 ? `${API_URL}${activity.images[0]}` : "/placeholder.svg"}
                    alt={activity.nom || "Activity"}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedActivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedActivity(null)}
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
                  const current = activities.find((a) => a.id === selectedActivity)
                  if (!current) return null
                  return (
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-2/3">
                        <img
                          src={current.images.length > 0 ? `${API_URL}${current.images[0]}` : "/placeholder.svg"}
                          alt={current.nom || "Activity"}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                      <div className="lg:w-1/3 p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                        <div className="space-y-4">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                            {current.type}
                          </Badge>
                          <h3 className="text-2xl font-bold text-gray-900">{current.nom}</h3>
                          <p className="text-gray-700">{current.description}</p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-5 h-5 text-amber-600" />
                              <span className="font-medium">Durée: {current.duree}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Users className="w-5 h-5 text-amber-600" />
                              <span className="font-medium">
                                {current.nbMinPersonne} - {current.nbMaxPersonne} personnes
                              </span>
                            </div>
                            {current.trancheAge && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <span className="font-medium">Âge: {current.trancheAge}</span>
                              </div>
                            )}
                            {current.prix && (
                              <div className="flex items-center gap-2 text-gray-700">
                                <span className="font-medium">Prix: {current.prix}</span>
                              </div>
                            )}
                          </div>
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                            Réserver cette aventure
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })()}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-gray-600 hover:bg-gray-100 rounded-full"
                  onClick={() => setSelectedActivity(null)}
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