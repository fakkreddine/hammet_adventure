"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adventure: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("contact")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Contactez <span className="gradient-text">Nous</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt pour votre prochaine aventure ? Contactez-nous dès maintenant pour réserver votre expérience quad
            inoubliable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">Informations de Contact</h3>
              <p className="text-gray-300 text-lg mb-8">
                Notre équipe est disponible 24/7 pour répondre à toutes vos questions et vous aider à planifier votre
                aventure parfaite.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-orange-500 rounded-full p-3">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Téléphone</div>
                  <div className="text-gray-300">+216 XX XXX XXX</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-blue-500 rounded-full p-3">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-gray-300">info@carthagequad.tn</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-green-500 rounded-full p-3">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Adresse</div>
                  <div className="text-gray-300">Hammamet, Tunisie</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="bg-purple-500 rounded-full p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Horaires</div>
                  <div className="text-gray-300">7j/7 - 8h00 à 20h00</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button className="w-full adventure-btn bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-full text-lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contactez-nous sur WhatsApp
            </Button>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? "animate-zoom-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold mb-6">Réservez Votre Aventure</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom Complet</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Aventure</label>
                    <select
                      name="adventure"
                      value={formData.adventure}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
                    >
                      <option value="">Choisir une aventure</option>
                      <option value="sunset">Quad Sunset Safari</option>
                      <option value="night">Night Quad Adventure</option>
                      <option value="discovery">Desert Discovery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-300"
                    placeholder="Parlez-nous de votre aventure idéale..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full adventure-btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-full text-lg animate-pulse-glow"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Envoyer la Demande
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
