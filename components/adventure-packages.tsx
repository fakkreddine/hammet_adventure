"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

const packages = [
  {
    id: 1,
    title: "Safari Coucher de Soleil",
    description: "Vivez la magie du désert au coucher du soleil avec nos quads premium",
    image: "/tunisian-desert-quad-bikes-sunset.png",
    duration: "3 heures",
    groupSize: "2-8 personnes",
    rating: 4.9,
    price: "120 DT",
    badge: "Populaire",
    features: ["Guide expert", "Équipement inclus", "Photos offertes", "Collation"],
  },
  {
    id: 2,
    title: "Aventure Nocturne",
    description: "Explorez le désert sous les étoiles pour une expérience unique",
    image: "/placeholder-ksr1g.png",
    duration: "4 heures",
    groupSize: "2-6 personnes",
    rating: 4.8,
    price: "180 DT",
    badge: "Exclusif",
    features: ["Éclairage LED", "Dîner traditionnel", "Observation étoiles", "Transport"],
  },
  {
    id: 3,
    title: "Découverte Oasis",
    description: "Parcourez les oasis cachées et découvrez la culture locale",
    image: "/quad-bikes-tunisian-oasis.png",
    duration: "6 heures",
    groupSize: "2-10 personnes",
    rating: 4.9,
    price: "250 DT",
    badge: "Complet",
    features: ["Visite oasis", "Déjeuner local", "Artisanat", "Guide culturel"],
  },
]

export default function AdventurePackages() {
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
                <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
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
          >
            Voir Tous les Circuits
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
