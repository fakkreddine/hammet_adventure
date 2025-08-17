"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Sparkles, Gift, Zap } from "lucide-react"

const exclusivePacks = [
  {
    id: 1,
    title: "VIP Luxury Package",
    description: "Ultimate luxury experience with premium accommodations and exclusive access",
    price: 2500,
    originalPrice: 3200,
    features: ["5-Star Hotels", "Private Transfers", "VIP Access", "Personal Concierge"],
    icon: Crown,
    gradient: "from-amber-400 to-orange-500",
    popular: true,
  },
  {
    id: 2,
    title: "Adventure Explorer Pack",
    description: "Perfect for thrill-seekers with guided adventures and unique experiences",
    price: 1800,
    originalPrice: 2300,
    features: ["Adventure Tours", "Expert Guides", "Equipment Included", "Group Activities"],
    icon: Zap,
    gradient: "from-emerald-400 to-teal-500",
    popular: false,
  },
  {
    id: 3,
    title: "Cultural Immersion Bundle",
    description: "Deep dive into local culture with authentic experiences and local guides",
    price: 1200,
    originalPrice: 1600,
    features: ["Local Experiences", "Cultural Tours", "Traditional Meals", "Art Workshops"],
    icon: Sparkles,
    gradient: "from-purple-400 to-pink-500",
    popular: false,
  },
  {
    id: 4,
    title: "Romantic Getaway Special",
    description: "Perfect for couples with romantic settings and intimate experiences",
    price: 2200,
    originalPrice: 2800,
    features: ["Couples Spa", "Romantic Dinners", "Sunset Tours", "Private Experiences"],
    icon: Gift,
    gradient: "from-rose-400 to-red-500",
    popular: false,
  },
]

export function PacksSection() {
  return (
    <div className="py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Exclusive Travel Packages</h2>
        <p className="text-muted-foreground">Curated experiences designed for unforgettable journeys</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exclusivePacks.map((pack, index) => {
          const IconComponent = pack.icon
          return (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/30">
                {pack.popular && (
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    className="absolute top-4 -left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 text-sm font-semibold transform -rotate-3 shadow-md"
                  >
                    Most Popular
                  </motion.div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 rounded-full bg-gradient-to-r ${pack.gradient} text-white shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{pack.title}</h3>
                        <p className="text-sm text-muted-foreground">{pack.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <motion.span className="text-3xl font-bold text-primary" whileHover={{ scale: 1.05 }}>
                      ${pack.price}
                    </motion.span>
                    <span className="text-lg text-muted-foreground line-through">${pack.originalPrice}</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      Save ${pack.originalPrice - pack.price}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {pack.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${pack.gradient}`} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full bg-gradient-to-r ${pack.gradient} hover:opacity-90 text-white shadow-md border-0`}
                    >
                      Book This Package
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
