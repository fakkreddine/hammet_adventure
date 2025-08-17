"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import CountUp from "./my_coponent/CountUp"

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    location: "Paris, France",
    rating: 5,
    text: "Réservation facile via WhatsApp, l'équipe nous a pris en charge à l'hôtel. L'excursion quad était absolument fantastique ! Guide professionnel et paysages à couper le souffle.",
    image: "/tunisia-quad-bikes.png",
    activity: "Aventure Quad",
  },
  {
    id: 2,
    name: "Ahmed Ben Ali",
    location: "Tunis, Tunisie",
    rating: 5,
    text: "Service impeccable du début à la fin. Le catamaran était magnifique, déjeuner délicieux et équipe très accueillante. Une journée inoubliable en famille !",
    image: "/tunisian-quad-bike-adventure.png",
    activity: "Excursion Catamaran",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London, UK",
    rating: 5,
    text: "La balade à dos de dromadaire au coucher du soleil était magique. Photos professionnelles incluses et thé traditionnel délicieux. Expérience authentique recommandée !",
    image: "/tunisia-quad-bikes.png",
    activity: "Balade Dromadaire",
  },
  {
    id: 4,
    name: "Marco Rossi",
    location: "Rome, Italy",
    rating: 5,
    text: "Organisation parfaite, matériel de qualité et guides expérimentés. Les quad dans les dunes de Hammamet offrent des sensations uniques. À refaire absolument !",
    image: "/tunisian-quad-bike-adventure.png",
    activity: "Aventure Quad",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-sans">
            Ce Que Disent Nos <span className="gradient-text">Aventuriers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-serif">
            Plus de 2000 clients satisfaits ont vécu des moments inoubliables avec nous
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden bg-card glass-morphism">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={currentTestimonial.image || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Activity Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {currentTestimonial.activity}
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Quote className="w-12 h-12 text-primary/20 mb-6" />

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.blockquote
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-lg text-muted-foreground leading-relaxed mb-8 italic font-serif"
                  >
                    "{currentTestimonial.text}"
                  </motion.blockquote>

                  {/* Customer Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <h4 className="text-xl font-bold text-foreground font-sans">{currentTestimonial.name}</h4>
                    <p className="text-muted-foreground font-serif">{currentTestimonial.location}</p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-morphism border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-morphism border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center mt-8 space-x-2"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { number: 2000, suffix: "+", label: "Clients Satisfaits", duration: 1 },
            { number: 4.5, suffix: "/5", label: "Note Moyenne", duration: 1 },
            { number: 5, suffix: " ans", label: "D'Expérience", duration: 1.5 },
            { number: 100, suffix: "%", label: "Sécurisé", duration: 1 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.3 }}
              className="glass-morphism p-6 rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                <CountUp
                  from={0}
                  to={stat.number}
                  separator={stat.number >= 1000 ? "," : ""}
                  direction="up"
                  duration={stat.duration}
                  className="count-up-text"
                  onStart={undefined}
                  onEnd={undefined}
                />
                <span className="gradient-text">{stat.suffix}</span>
              </div>
              <div className="text-muted-foreground font-serif">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
