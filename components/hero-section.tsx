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
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl md:text-7xl font-dm font-bold text-slate-900 mb-8 leading-tight tracking-tight"
          >
            L'aventure vous{" "}
            <span className="relative inline-block">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 font-extrabold"
              >
                attend
              </motion.span>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 1.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  scaleX: { type: "spring", stiffness: 100, damping: 15 },
                }}
                className="absolute inset-0 bg-gradient-to-r from-green-100/80 via-emerald-50/80 to-teal-50/80 rounded-lg transform -skew-x-6 origin-left"
              />

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.5,
                  delay: 1.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full origin-left"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 3,
                  delay: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-lg blur-sm -m-2"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 font-sans leading-relaxed font-light"
          >
            Découvrez les paysages époustouflants de Hammamet à travers des aventures quad inoubliables. Vivez
            l'expérience tunisienne authentique avec nos guides experts certifiés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg relative overflow-hidden group">
                <span className="relative z-10">Réserver Maintenant</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Button
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-10 py-4 rounded-xl font-semibold bg-transparent text-lg transition-all duration-300"
              >
                Voir les Circuits
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group"
        >
          <Image
            src="/tunisian-quad-sunset.png"
            alt="Aventure Quad au coucher du soleil à Hammamet"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <motion.div
            className="absolute top-20 right-20 w-2 h-2 bg-yellow-400/60 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-40 w-1.5 h-1.5 bg-orange-400/50 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
              ease: "easeInOut",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
