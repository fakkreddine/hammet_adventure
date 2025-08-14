"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = "+21672123456"
  const defaultMessage = "Bonjour! Je souhaite réserver une aventure à Hammamet. Pouvez-vous m'aider?"

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, "_blank")
  }

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="icon"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>

        {/* WhatsApp Popup */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Hammamet Adventures</h4>
                  <p className="text-sm text-green-100">En ligne maintenant</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">Salut! 👋 Comment pouvons-nous vous aider aujourd'hui?</p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={openWhatsApp}
                  className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                  variant="outline"
                >
                  🏍️ Réserver une aventure Quad
                </Button>
                <Button
                  onClick={openWhatsApp}
                  className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                  variant="outline"
                >
                  ⛵ Excursion Catamaran
                </Button>
                <Button
                  onClick={openWhatsApp}
                  className="w-full justify-start bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200"
                  variant="outline"
                >
                  🐪 Balade Dromadaire
                </Button>
                <Button
                  onClick={openWhatsApp}
                  className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"
                  variant="outline"
                >
                  ❓ Autre question
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">Réponse garantie en moins de 5 minutes</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
