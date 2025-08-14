"use client"

import { useEffect, useState } from "react"
import { Users, MapPin, Star, Calendar } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: 28,
    suffix: "k",
    title: "Total Clients",
    description: "Aventuriers satisfaits",
  },
  {
    icon: Star,
    number: 4.9,
    suffix: "/5",
    title: "Note Moyenne",
    description: "Évaluations clients",
  },
  {
    icon: MapPin,
    number: 15,
    suffix: "+",
    title: "Circuits Uniques",
    description: "Parcours découverte",
  },
  {
    icon: Calendar,
    number: 365,
    suffix: "",
    title: "Jours par An",
    description: "Service disponible",
  },
]

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate numbers
          stats.forEach((stat, index) => {
            let start = 0
            const end = stat.number
            const duration = 2000
            const increment = end / (duration / 16)

            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                start = end
                clearInterval(timer)
              }
              setAnimatedNumbers((prev) => {
                const newNumbers = [...prev]
                newNumbers[index] = Math.floor(start * 10) / 10
                return newNumbers
              })
            }, 16)
          })
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-16 bg-brand-green relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center animate-float">
                  <stat.icon className="text-brand-green-dark" size={28} />
                </div>
              </div>

              {/* Number */}
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {animatedNumbers[index]}
                  {stat.suffix}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-1">{stat.title}</h3>

              {/* Description */}
              <p className="text-green-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
