"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Image
              src="/logo-carthage-quad.jpg"
              alt="Carthage Quad"
              width={48}
              height={48}
              className="rounded-xl shadow-md"
            />
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Carthage Quad</h1>
              <p className="text-sm text-slate-500 font-medium tracking-wide">HAMMAMET ADVENTURES</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#home"
              className="text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors tracking-wide"
            >
              Accueil
            </a>
            <a
              href="#adventures"
              className="text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors tracking-wide"
            >
              Aventures
            </a>
            <a
              href="#about"
              className="text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors tracking-wide"
            >
              À Propos
            </a>
            <a
              href="#contact"
              className="text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors tracking-wide"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg">
              Réserver Aventure
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-slate-700 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-200">
            <div className="space-y-6">
              <a
                href="#home"
                className="block text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors"
              >
                Accueil
              </a>
              <a
                href="#adventures"
                className="block text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors"
              >
                Aventures
              </a>
              <a
                href="#about"
                className="block text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors"
              >
                À Propos
              </a>
              <a
                href="#contact"
                className="block text-slate-700 hover:text-green-600 font-semibold text-lg transition-colors"
              >
                Contact
              </a>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg text-lg">
                Réserver Aventure
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
