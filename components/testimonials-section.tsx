"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    location: "Paris, France",
    rating: 5,
    text: "Réservation facile via WhatsApp, l'équipe nous a pris en charge à l'hôtel. L'excursion quad était absolument fantastique ! Guide professionnel et paysages à couper le souffle.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-12%20%C3%A0%2023.01.59_033d62c5.jpg-hcdg965WWvTCmhmN7q2dfsR6MJ6wWW.jpeg",
    activity: "Aventure Quad",
  },
  {
    id: 2,
    name: "Ahmed Ben Ali",
    location: "Tunis, Tunisie",
    rating: 5,
    text: "Service impeccable du début à la fin. Le catamaran était magnifique, déjeuner délicieux et équipe très accueillante. Une journée inoubliable en famille !",
    image: "/happy-middle-eastern-man.png",
    activity: "Excursion Catamaran",
  },
  {
    id: 3,
    name: "Emma Thompson",
    location: "London, UK",
    rating: 5,
    text: "La balade à dos de dromadaire au coucher du soleil était magique. Photos professionnelles incluses et thé traditionnel délicieux. Expérience authentique recommandée !",
    image: "/happy-british-tourist.png",
    activity: "Balade Dromadaire",
  },
  {
    id: 4,
    name: "Marco Rossi",
    location: "Rome, Italy",
    rating: 5,
    text: "Organisation parfaite, matériel de qualité et guides expérimentés. Les quad dans les dunes de Hammamet offrent des sensations uniques. À refaire absolument !",
    image: "/happy-italian-tourist.png",
    activity: "Aventure Quad",
  },
  {
    id: 5,
    name: "Fatima Zahra",
    location: "Casablanca, Maroc",
    rating: 5,
    text: "Accueil chaleureux et service premium. Le catamaran avec vue sur la côte de Hammamet était spectaculaire. Équipe professionnelle et attentionnée.",
    image: "/happy-moroccan-woman-smiling.png",
    activity: "Excursion Catamaran",
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
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6">
            Ce Que Disent Nos <span className="text-green-600">Aventuriers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plus de 2000 clients satisfaits ont vécu des moments inoubliables avec nous
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden bg-white">
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
                  <div className="absolute bottom-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {currentTestimonial.activity}
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Quote className="w-12 h-12 text-green-600/20 mb-6" />

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < currentTestimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 italic">
                    "{currentTestimonial.text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div>
                    <h4 className="text-xl font-serif font-bold text-gray-900">{currentTestimonial.name}</h4>
                    <p className="text-gray-600">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-green-600/20 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-green-600/20 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-green-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">2000+</div>
            <div className="text-gray-600">Clients Satisfaits</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Note Moyenne</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">5 ans</div>
            <div className="text-gray-600">D'Expérience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Sécurisé</div>
          </div>
        </div>
      </div>
    </section>
  )
}
