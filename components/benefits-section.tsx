"use client"

import { motion } from "framer-motion"
import { Users, Camera, UserCheck, Heart, Shield, Award } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Une activité conviviale",
    description:
      "Partagez des moments uniques et créez des souvenirs mémorables, tout en profitant de la beauté des paysages.",
    color: "text-white",
  },
  {
    icon: Camera,
    title: "Immortalisez vos souvenirs",
    description:
      "Au cours de chaque balade, nous prévoyons des pauses spécialement dédiées pour admirer le paysage et prendre des photos.",
    color: "text-white",
  },
  {
    icon: UserCheck,
    title: "Des guides expérimentés",
    description:
      "Nos accompagnateurs connaissent parfaitement la région et veilleront à ce que vous viviez une expérience mémorable.",
    color: "text-white",
  },
]

const additionalBenefits = [
  {
    icon: Heart,
    title: "Sécurité garantie",
    description: "Équipements de protection fournis et circuits sécurisés",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description: "Couverture complète pour votre tranquillité d'esprit",
  },
  {
    icon: Award,
    title: "Excellence reconnue",
    description: "Plus de 2000 clients satisfaits et 4.9/5 étoiles",
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-20 gradient-benefits relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 border-2 border-white rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Pourquoi choisir nos aventures ?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Découvrez les avantages uniques qui font de nos excursions une expérience exceptionnelle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="text-center p-8 glass rounded-2xl backdrop-blur-lg elegant-hover"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6"
              >
                <benefit.icon className={`w-10 h-10 ${benefit.color}`} />
              </motion.div>
              <h3 className="text-2xl font-serif font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-white/90 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {additionalBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-6 glass rounded-xl backdrop-blur-lg"
            >
              <div className="flex-shrink-0">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                <p className="text-sm text-white/80">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
