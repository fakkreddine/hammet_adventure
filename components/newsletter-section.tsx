"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="max-w-5xl mx-auto overflow-hidden shadow-2xl border-0">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="p-8 lg:p-12 bg-card"
                >
                  <div className="flex items-center mb-4">
                    <Mail className="h-8 w-8 text-primary mr-3" />
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-sans">
                      Restez Connecté à l'<span className="gradient-text">Aventure</span>
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg font-serif">
                    Recevez nos offres exclusives et conseils d'experts pour vos prochaines aventures à Hammamet
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-3"
                  >
                    <Input
                      placeholder="Votre adresse email"
                      className="flex-1 h-12 text-lg border-2 border-border focus:border-primary transition-colors"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Send className="mr-2 h-5 w-5" />
                        S'abonner
                      </Button>
                    </motion.div>
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-4 font-serif">
                    Pas de spam, désabonnez-vous à tout moment.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative h-64 lg:h-auto"
                >
                  <img
                    src="/tunisian-quad-bike-adventure-newsletter.png"
                    alt="Adventure Newsletter"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent" />

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute top-8 right-8 w-16 h-16 bg-secondary/30 rounded-full blur-xl"
                    animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute bottom-12 left-8 w-12 h-12 bg-primary/40 rounded-full blur-lg"
                    animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
