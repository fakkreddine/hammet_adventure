import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star } from "lucide-react"

const activities = [
  {
    id: "quad",
    title: "Aventure Quad",
    description: "Explorez les dunes dorées et les paysages époustouflants de Hammamet",
    duration: "2-3 heures",
    price: "120 DT",
    capacity: "1-2 personnes",
    rating: 4.9,
    image: "/quad-adventure-hammamet.png",
    features: ["Guide expérimenté", "Équipement inclus", "Photos souvenirs"],
  },
  {
    id: "catamaran",
    title: "Excursion Catamaran",
    description: "Naviguez sur les eaux cristallines avec vue panoramique sur la côte",
    duration: "4-5 heures",
    price: "180 DT",
    capacity: "8-12 personnes",
    rating: 4.8,
    image: "/catamaran-sunset-hammamet.png",
    features: ["Déjeuner inclus", "Snorkeling", "Boissons à bord"],
  },
  {
    id: "camel",
    title: "Balade Dromadaire",
    description: "Découvrez la tradition bédouine au coucher du soleil",
    duration: "1-2 heures",
    price: "80 DT",
    capacity: "1-4 personnes",
    rating: 4.7,
    image: "/camel-ride-sunset-hammamet.png",
    features: ["Coucher de soleil", "Thé traditionnel", "Costume bédouin"],
  },
]

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-20 bg-gradient-to-b from-white to-sand-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-gray mb-6">
            Nos <span className="text-coral-orange">Aventures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choisissez votre aventure parfaite parmi nos expériences premium soigneusement conçues pour vous offrir des
            souvenirs inoubliables à Hammamet
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-charcoal-gray">{activity.rating}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 left-4 bg-coral-orange text-white rounded-full px-4 py-2 font-bold text-lg">
                  {activity.price}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-bold text-charcoal-gray mb-3 group-hover:text-sky-blue transition-colors">
                  {activity.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{activity.description}</p>

                {/* Activity Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{activity.capacity}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-1">
                    {activity.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-turquoise-green rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg group-hover:bg-coral-orange group-hover:hover:bg-coral-orange/90">
                  Réserver Maintenant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Besoin d'aide pour choisir votre aventure parfaite ?</p>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent"
          >
            Contactez nos Experts
          </Button>
        </div>
      </div>
    </section>
  )
}
