"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, MapPin } from "lucide-react"

export function AdventuresGallery() {
  const adventures = [
    {
      id: 1,
      title: "Sunset Quad Safari",
      description: "Explorez les dunes au coucher du soleil avec des vues à couper le souffle",
      duration: "3 heures",
      participants: "2-8 personnes",
      rating: 4.9,
      price: "120 DT",
      image: "/tunisian-desert-quad-bike-sunset.png",
      location: "Hammamet Desert",
    },
    {
      id: 2,
      title: "Night Adventure",
      description: "Aventure nocturne avec éclairage spécial pour une expérience unique",
      duration: "2.5 heures",
      participants: "2-6 personnes",
      rating: 4.8,
      price: "150 DT",
      image: "/placeholder-52c9w.png",
      location: "Hammamet Hills",
    },
    {
      id: 3,
      title: "Desert Discovery",
      description: "Découvrez la faune et la flore du désert avec notre guide expert",
      duration: "4 heures",
      participants: "2-10 personnes",
      rating: 4.9,
      price: "180 DT",
      image: "/tunisian-quad-bike-safari.png",
      location: "Hammamet Sahara",
    },
  ]

  const categories = ["Tous", "Coucher de soleil", "Aventures nocturnes", "Découvertes", "Groupes"]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Check out nearest adventures</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing quad adventures in Hammamet with professional guides and top-quality equipment
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Button key={category} variant={index === 0 ? "default" : "outline"} className="rounded-full px-6 py-2">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Adventure */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Group Panorama Experience</h3>
                <p className="mb-4">Join fellow adventurers for breathtaking views</p>
                <Button variant="secondary" size="lg">
                  Book Now
                </Button>
              </div>
              <img
                src="/tunisia-quad-bike-panorama.png"
                alt="Group Panorama Experience"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
              />
            </div>
          </CardContent>
        </Card>

        {/* Adventure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventures.map((adventure) => (
            <Card key={adventure.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={adventure.image || "/placeholder.svg"}
                    alt={adventure.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
                    {adventure.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{adventure.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{adventure.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {adventure.location}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{adventure.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {adventure.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {adventure.participants}
                    </div>
                  </div>
                  <Button className="w-full">Book Adventure</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
