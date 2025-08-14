"use client"

import { CreditCard, FileText, Sparkles } from "lucide-react"

const steps = [
  {
    icon: CreditCard,
    title: "1. Réservez votre excursion en ligne",
    description:
      "Vous réservez directement votre excursion en ligne sur notre site web (100% sécurisé) et vous pouvez payer la totalité du montant d'avance ou bien 50% et le reste sur place.",
  },
  {
    icon: FileText,
    title: "2. Présentez votre reçu sur place",
    description:
      "Une fois sur place vous présentez votre reçu / voucher que vous l'avez reçu par email pour qu'on puisse identifier votre réservation et vous associer au groupe et service adéquat.",
  },
  {
    icon: Sparkles,
    title: "3. Profitez d'une expérience unique",
    description:
      "Commencez votre expérience et vivez l'aventure avec le groupe dans des cadres exceptionnels et naturels guidé par une équipe professionnelle. Découvrez la nature en Hammamet tout en profitant d'une balade inoubliable.",
  },
]

export default function BookingSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="font-serif text-2xl text-[#2D8B57] mb-4">3 étapes faciles</h3>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Réservez votre aventure dès aujourd'hui !
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous réservez directement votre excursion en ligne sur notre site web et vous pouvez payer la totalité du
            montant d'avance ou 50% et le reste sur place.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#2D8B57] to-[#4CAF50] rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 animate-float">
                  <step.icon className="text-white" size={32} />
                </div>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#2D8B57] to-[#4CAF50] opacity-30"></div>
                )}
              </div>

              {/* Content */}
              <div className="bg-[#F8FFF8] rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-[#1B4332] mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-[#FFD700] hover:bg-[#FFC107] text-[#1B4332] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 animate-pulse-glow">
            Commencer Maintenant
          </button>
        </div>
      </div>
    </section>
  )
}
