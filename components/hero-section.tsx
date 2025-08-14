"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, Calendar, Users, Search } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export function HeroSection() {
  const [destination, setDestination] = useState("Choisir destination")
  const [date, setDate] = useState("16 Janvier, 2024")
  const [category, setCategory] = useState("Quad Aventure")
  const [guests, setGuests] = useState("2 adultes, 1 enfant")

  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-50 via-white to-green-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 leading-tight tracking-tight"
          >
            L'aventure vous{" "}
            <span className="text-green-700 relative">
              attend
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-2 left-0 w-full h-1 bg-green-500 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 font-sans leading-relaxed font-light"
          >
            Découvrez les paysages époustouflants de Hammamet à travers des aventures quad inoubliables. Vivez
            l'expérience tunisienne authentique avec nos guides experts certifiés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-3 flex items-center space-x-1 max-w-5xl w-full backdrop-blur-sm">
              <div className="flex items-center space-x-3 px-6 py-4 hover:bg-slate-50 rounded-xl cursor-pointer flex-1 transition-colors">
                <MapPin className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Destination</p>
                  <p className="font-semibold text-slate-800 text-lg">{destination}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              <div className="w-px h-12 bg-slate-200" />

              <div className="flex items-center space-x-3 px-6 py-4 hover:bg-slate-50 rounded-xl cursor-pointer flex-1 transition-colors">
                <Calendar className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Date</p>
                  <p className="font-semibold text-slate-800 text-lg">{date}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              <div className="w-px h-12 bg-slate-200" />

              <div className="flex items-center space-x-3 px-6 py-4 hover:bg-slate-50 rounded-xl cursor-pointer flex-1 transition-colors">
                <div className="w-5 h-5 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Q</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Catégorie</p>
                  <p className="font-semibold text-slate-800 text-lg">{category}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              <div className="w-px h-12 bg-slate-200" />

              <div className="flex items-center space-x-3 px-6 py-4 hover:bg-slate-50 rounded-xl cursor-pointer flex-1 transition-colors">
                <Users className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Participants</p>
                  <p className="font-semibold text-slate-800 text-lg">{guests}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              <Button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl ml-3 shadow-lg hover:shadow-xl transition-all">
                <Search className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg">
              Réserver Maintenant
            </Button>
            <Button
              variant="outline"
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-10 py-4 rounded-xl font-semibold bg-transparent text-lg transition-all"
            >
              Voir les Circuits
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
        >
          <Image
            src="/hero-sunset-quad.jpg"
            alt="Aventure Quad au coucher du soleil à Hammamet"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute bottom-10 left-10 text-white"
          >
            <p className="text-3xl font-serif font-bold mb-3 tracking-tight">Couchers de soleil magiques</p>
            <p className="text-xl opacity-90 font-light">Vivez des moments inoubliables dans le désert tunisien</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
