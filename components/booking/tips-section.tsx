import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, MapPin, Clock } from "lucide-react"

const tips = [
  {
    id: 1,
    title: "Best Time to Visit Japan",
    description: "Cherry blossom season offers stunning views but book early for better rates.",
    category: "Seasonal",
    icon: Clock,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Hidden Gems in Paris",
    description: "Skip the crowds at Montmartre and explore the charming Belleville neighborhood.",
    category: "Local Tips",
    icon: MapPin,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    title: "Save 30% on Hotels",
    description: "Book Tuesday-Thursday stays and use our exclusive partner discounts.",
    category: "Savings",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    title: "Travel Insurance Must-Haves",
    description: "Essential coverage for adventure activities and medical emergencies abroad.",
    category: "Safety",
    icon: Lightbulb,
    color: "bg-orange-100 text-orange-700",
  },
]

export function TipsSection() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Travel Tips & Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip) => {
          const IconComponent = tip.icon
          return (
            <Card key={tip.id} className="hover:shadow-md transition-shadow border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${tip.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{tip.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
