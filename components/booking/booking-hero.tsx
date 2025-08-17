"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Users } from "lucide-react"

interface BookingHeroProps {
  onSearch: (filters: {
    destination: string
    serviceType: string
    date: string
    guests: string
  }) => void
}

export function BookingHero({ onSearch }: BookingHeroProps) {
  const [destination, setDestination] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")

  const handleSearch = () => {
    onSearch({
      destination,
      serviceType,
      date,
      guests,
    })
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
      <div className="absolute inset-0 bg-[url('/stunning-landscape.png')] bg-cover bg-center opacity-10" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Discover Your Next
            <span className="text-primary block">Adventure</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book hotels, plan trips, find entertainment, and get insider tips all in one place
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-6 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 h-12 border-0 bg-muted/50"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 h-12 border-0 bg-muted/50"
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="pl-10 h-12 border-0 bg-muted/50">
                  <SelectValue placeholder="Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {["Hotels", "Trips", "Entertainment", "Tips"].map((type) => (
              <Button
                key={type}
                variant={serviceType === type ? "default" : "outline"}
                onClick={() => setServiceType(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
