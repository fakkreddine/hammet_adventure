"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

interface Package {
  id: number
  title: string
  description: string
  image: string
  duration: string
  groupSize: string
  rating: number
  price: string
  badge: string
  features: string[]
}

export default function AdventurePackages() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  const [packages, setPackages] = useState<Package[]>([])
  const [allPackages, setAllPackages] = useState<Package[]>([])
  const [showAll, setShowAll] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch activities from the API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/activities`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        console.log("Activities fetched:", data)

        // Map API response to Package interface
        const mappedPackages: Package[] = data.map((activity: any) => ({
          id: activity.id,
          title: activity.nom || "Aventure Sans Nom",
          description: activity.description || "Aucune description disponible",
          image: activity.images?.length > 0 ? `${API_URL}${activity.images[0]}` : "/placeholder.svg",
          duration: activity.duree ? String(activity.duree) : "Non spécifié",
          groupSize: activity.nbMinPersonne && activity.nbMaxPersonne 
            ? `${activity.nbMinPersonne}-${activity.nbMaxPersonne} personnes` 
            : "Non spécifié",
          rating: activity.rating || 4.5, // Fallback rating if not provided
          price: activity.prix ? `${String(activity.prix)} DT` : "Prix sur demande",
          badge: activity.featured ? "Populaire" : activity.type || "Standard",
          features: activity.features || ["Guide inclus", "Équipement fourni"], // Fallback features
        }))

        // Store all packages and initially show only 3
        setAllPackages(mappedPackages)
        setPackages(mappedPackages.slice(0, 3))
        setError(null)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError("Impossible de charger les aventures. Veuillez réessayer plus tard.")
      }
    }
    fetchActivities()
  }, [API_URL])

  // Toggle between showing 3 packages and all packages
  const handleToggleShowAll = () => {
    if (showAll) {
      // Show only 3 packages
      setPackages(allPackages.slice(0, 3))
      setShowAll(false)
    } else {
      // Show all packages
      setPackages(allPackages)
      setShowAll(true)
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos <span className="gradient-text">Aventures</span> Signature
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choisissez parmi nos circuits soigneusement conçus pour tous les niveaux d'aventuriers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
            >
              <div className="relative">
                <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{pkg.badge}</Badge>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">{pkg.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{pkg.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {pkg.groupSize}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">/ personne</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-semibold">
                    Réserver
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl font-semibold bg-transparent"
            onClick={handleToggleShowAll}
          >
            {showAll ? "Voir Moins" : "Voir Tous les Circuits"}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}