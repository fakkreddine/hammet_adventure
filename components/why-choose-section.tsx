"use client"

import { Shield, Star, Users, Headphones } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description:
      "Équipements de sécurité certifiés, guides expérimentés et assurance complète pour votre tranquillité d'esprit.",
  },
  {
    icon: Star,
    title: "Expériences Authentiques",
    description: "Découvrez les secrets de Hammamet avec nos circuits exclusifs et nos guides locaux passionnés.",
  },
  {
    icon: Users,
    title: "Service Premium",
    description:
      "Plus de 2000 clients satisfaits, note moyenne de 4.9/5 étoiles et certification TripAdvisor Excellence.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description:
      "Notre équipe dédiée est disponible à tout moment pour vous accompagner avant, pendant et après votre aventure.",
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
            Pourquoi choisir Carthage Quad ?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            Nous nous engageons à vous offrir une expérience d'aventure exceptionnelle, alliant sécurité, authenticité
            et service de qualité supérieure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-light text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
