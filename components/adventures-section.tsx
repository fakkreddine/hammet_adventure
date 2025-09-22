"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface Activity {
  id: number
  nom: string | null
  type: string | null
  prix: number
  images: string[]
  duree: number
  nbMinPersonne: number
  nbMaxPersonne: number
  trancheAge: string | null
  description: string | null
  included: string[]
}

export default function AdventurePackages() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [visibleCount, setVisibleCount] = useState(3)
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    fetch(`${API_URL}/activities`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ API response:", data) // log for debugging
        const filtered = data.filter((a: Activity) => a.nom && a.prix > 0)
        setActivities(filtered)
      })
      .catch((err) => console.error("❌ Error fetching activities:", err))
  }, [API_URL])

  const toggleShowMore = () => {
    setVisibleCount(visibleCount === 3 ? activities.length : 3)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
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
            Choisissez parmi nos circuits soigneusement conçus pour tous les niveaux d&apos;aventuriers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.slice(0, visibleCount).map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50"
            >
              <div className="relative">
                <img
                  src={
                    activity.images.length > 0
                      ? `${API_URL}${activity.images[0]}`
                      : "/placeholder.svg"
                  }
                  alt={activity.nom || "Activity"}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {activity.type || "Aventure"}
                </Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-2">{activity.nom}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {activity.description || "Découvrez une aventure inoubliable avec nos quads."}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {activity.duree} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {activity.nbMinPersonne}-{activity.nbMaxPersonne} personnes
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {activity.included.length > 0 ? (
                    activity.included.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{inc}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">Équipement inclus</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{activity.prix} DT</span>
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

        {activities.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              onClick={toggleShowMore}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-xl font-semibold bg-transparent"
            >
              {visibleCount === 3 ? "Voir Tous les Circuits" : "Voir Moins"}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
