"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Calendar, Users, Search } from "lucide-react"

export function SearchBar() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm rounded-full shadow-lg border border-border/50 p-2">
        <div className="flex items-center gap-2">
          {/* Location */}
          <div className="flex items-center space-x-2 px-4 py-2 flex-1 min-w-0">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <Input
              placeholder="Destination"
              className="border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          <div className="w-px h-8 bg-border/50" />

          {/* Date */}
          <div className="flex items-center space-x-2 px-4 py-2 flex-1 min-w-0">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <Input type="date" className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0" />
          </div>

          <div className="w-px h-8 bg-border/50" />

          {/* Guests */}
          <div className="flex items-center space-x-2 px-4 py-2 flex-1 min-w-0">
            <Users className="h-4 w-4 text-primary flex-shrink-0" />
            <Input
              placeholder="Participants"
              className="border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          {/* Search Button */}
          <Button size="sm" className="rounded-full px-6 py-2 font-semibold">
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
        </div>
      </div>
      {/* </CHANGE> */}
    </div>
  )
}
