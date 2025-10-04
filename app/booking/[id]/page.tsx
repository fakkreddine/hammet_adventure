"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, Heart, ArrowLeft, Check, Info, Share2, Loader2, AlertCircle, Calendar } from "lucide-react"

interface Activity {
  id: number
  nom: string
  type: string
  prix: number
  images: string[]
  duree: number
  nbMinPersonne: number
  nbMaxPersonne: number
  trancheAge: string
  description: string
  included: string[]
  maxBookingsPerDay: number
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins} min`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}

const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
}

export default function ActivityPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [activity, setActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const activityId = params.id as string

  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`${getApiUrl()}/activities/${activityId}`)

        if (!response.ok) {
          throw new Error("Activité introuvable")
        }

        const data: Activity = await response.json()
        setActivity(data)
      } catch (err) {
        console.error("Erreur:", err)
        setError(err instanceof Error ? err.message : "Une erreur est survenue")
      } finally {
        setIsLoading(false)
      }
    }

    if (activityId) {
      fetchActivity()
    }
  }, [activityId])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">Chargement...</p>
        </motion.div>
      </div>
    )
  }

  // Error state
  if (error || !activity) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-4">{error || "Activité introuvable"}</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    )
  }

  const displayImages = activity.images.length > 0 ? activity.images : ["/adventure-activity.jpg"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-xl overflow-hidden bg-muted"
            >
              <img
                src={displayImages[selectedImage] || "/placeholder.svg"}
                alt={activity.nom}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayImages.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${activity.nom} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{activity.type}</Badge>
                </div>
                <h1 className="text-2xl font-bold mb-4">{activity.nom}</h1>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary">{activity.prix}€</span>
                  <span className="text-muted-foreground">/ personne</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 py-4 border-y">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Durée:</span>
                  <span className="text-muted-foreground">{formatDuration(activity.duree)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Groupe:</span>
                  <span className="text-muted-foreground">
                    {activity.nbMinPersonne}-{activity.nbMaxPersonne} personnes
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Âge:</span>
                  <span className="text-muted-foreground">{activity.trancheAge} ans</span>
                </div>
              </div>

              {/* CTA */}
              <Button size="lg" className="w-full" onClick={() => router.push(`/reservation/${activity.id}`)}>
                Réserver maintenant
              </Button>

              <p className="text-xs text-center text-muted-foreground">Annulation gratuite jusqu'à 24h avant</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="included">Inclus</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">À propos de cette activité</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {activity.description || "Aucune description disponible."}
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="included" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ce qui est inclus</h2>
              {activity.included.length > 0 ? (
                <ul className="space-y-3">
                  {activity.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Aucune information disponible.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        <Card className="mt-6 p-6 bg-muted/50">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Informations importantes</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Réservation confirmée instantanément</li>
                <li>• Annulation gratuite jusqu'à 24h avant le départ</li>
                <li>• Places limitées à {activity.maxBookingsPerDay || "disponibles"} réservations par jour</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
