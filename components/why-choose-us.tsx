"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, MapPin, Clock, Star } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description: "Équipements de sécurité certifiés et guides expérimentés pour votre tranquillité d'esprit",
  },
  {
    icon: Award,
    title: "Excellence Reconnue",
    description: "Plus de 15 ans d'expérience et des milliers d'aventuriers satisfaits",
  },
  {
    icon: Users,
    title: "Guides Experts",
    description: "Équipe locale passionnée qui connaît chaque recoin du désert tunisien",
  },
  {
    icon: MapPin,
    title: "Circuits Uniques",
    description: "Découvrez des paysages cachés et des spots secrets loin des sentiers battus",
  },
  {
    icon: Clock,
    title: "Flexibilité Totale",
    description: "Horaires adaptables et circuits personnalisés selon vos préférences",
  },
  {
    icon: Star,
    title: "Expérience Premium",
    description: "Service haut de gamme avec attention aux détails pour des souvenirs inoubliables",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi Choisir <span className="gradient-text">Carthage Adventures</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre partenaire de confiance pour des aventures inoubliables dans le désert tunisien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
