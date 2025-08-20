"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, X } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Réservation", href: "/booking" },
    { name: "À propos", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
            <span className="text-lg font-bold">CQ</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">Carthage Quad</h1>
            <p className="text-xs text-muted-foreground">HAMMAMET ADVENTURES</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-amber-600 transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          <Button variant="ghost" size="sm" className="relative hover:bg-amber-50">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Panier</span>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-xs text-white flex items-center justify-center">
              0
            </span>
          </Button>
          <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50 bg-transparent" asChild>
            <a href="/login">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </a>
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            asChild
          >
            <a href="/signup">S'inscrire</a>
          </Button>
        </div>

        {/* Enhanced Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="hover:bg-amber-50">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <motion.div
              className="flex flex-col h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="p-6 border-b bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                    <span className="text-sm font-bold">CQ</span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-foreground">Carthage Quad</h2>
                    <p className="text-xs text-muted-foreground">HAMMAMET ADVENTURES</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 p-6">
                <nav className="space-y-4">
                  {navigation.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-lg font-medium text-foreground hover:text-amber-600 transition-colors py-3 px-4 rounded-lg hover:bg-amber-50"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Language Selector */}
                <motion.div
                  className="mt-8 p-4 bg-amber-50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <p className="text-sm font-medium text-gray-700 mb-2">Langue</p>
                  <LanguageSelector />
                </motion.div>
              </div>

              {/* Actions */}
              <motion.div
                className="p-6 border-t space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start border-amber-200 hover:bg-amber-50 bg-transparent"
                  asChild
                >
                  <a href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </a>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  asChild
                >
                  <a href="/signup">S'inscrire</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-amber-50">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Panier (0)
                </Button>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
