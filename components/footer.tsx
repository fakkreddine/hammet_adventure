"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  const quickLinks = [
    { name: "Accueil", href: "#" },
    { name: "Nos Activités", href: "#" },
    { name: "Réservation", href: "#" },
    { name: "Blog & Guides", href: "#" },
    { name: "À Propos", href: "#" },
    { name: "Conditions", href: "#" },
  ]

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4 font-sans">Carthage Quad Hammamet</h3>
            <p className="text-gray-300 mb-6 leading-relaxed font-serif">
              Votre partenaire de confiance pour des aventures inoubliables à Hammamet. Quad, catamaran, dromadaire -
              Vivez l'expérience tunisienne authentique avec notre équipe d'experts locaux.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-gray-600 hover:bg-primary hover:border-primary bg-transparent transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4 text-lg font-sans">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 font-serif hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4 text-lg font-sans">Contact</h4>
            <div className="space-y-4">
              <motion.div className="flex items-start space-x-3" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-serif">Zone Touristique Yasmine</p>
                  <p className="text-gray-300 font-serif">8050 Hammamet, Tunisie</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-serif">+216 72 123 456</p>
                  <p className="text-gray-300 font-serif">+216 98 765 432</p>
                </div>
              </motion.div>
              <motion.div className="flex items-center space-x-3" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-gray-300 font-serif">info@carthage-quad.tn</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4 text-lg font-sans">Horaires d'ouverture</h4>
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-gray-300 font-serif">Lun - Dim: 8h00 - 20h00</p>
                <p className="text-gray-300 font-serif">Support 24h/7j via WhatsApp</p>
              </div>
            </motion.div>

            <div>
              <motion.div
                className="flex items-center space-x-2 mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.div
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-sm text-gray-300 font-serif">Paiement 100% Sécurisé</span>
              </motion.div>
              <div className="flex space-x-2">
                {["VISA", "MC", "PP"].map((payment, index) => (
                  <motion.div
                    key={payment}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-10 h-6 rounded text-xs flex items-center justify-center font-bold ${
                      payment === "VISA" ? "bg-blue-600" : payment === "MC" ? "bg-red-600" : "bg-primary"
                    }`}
                  >
                    {payment}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm font-serif">© 2024 Carthage Quad Hammamet. Tous droits réservés</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors font-serif">
              Licence Tourisme: TN-2024-001
            </a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors font-serif">
              Assurance Responsabilité Civile
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
