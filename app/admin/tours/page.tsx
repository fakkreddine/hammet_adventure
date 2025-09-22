
"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Search, Filter, Edit, Eye, ArrowLeft, Plus, Users, DollarSign, Clock, Trash2 } from 'lucide-react'
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Tour {
  id: string
  title: string
  description: string
  short_description: string
  price: number
  duration_hours: number
  min_participants: number
  max_participants: number
  difficulty_level: string
  features: string[]
  image_urls: string[]
  location: string
  created_at: string
  updated_at: string
}

function getDifficultyBadgeColor(difficulty: string) {
  switch (difficulty) {
    case "easy": return "bg-green-100 text-green-800 hover:bg-green-100";
    case "moderate": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "hard": return "bg-red-100 text-red-800 hover:bg-red-100";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

function getDifficultyLabel(difficulty: string) {
  switch (difficulty) {
    case "easy": return "Facile";
    case "moderate": return "Modéré";
    case "hard": return "Difficile";
    default: return difficulty;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ToursManagementPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [filteredTours, setFilteredTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadTours()
  }, [])

  useEffect(() => {
    filterTours()
  }, [tours, searchTerm, difficultyFilter])

  const mapTrancheAgeToDifficulty = (trancheAge: string | null): string => {
    if (!trancheAge) return "moderate";
    const ageRange = trancheAge.split("-").map(Number);
    const minAge = ageRange[0] || 0;
    if (minAge <= 10) return "easy";
    if (minAge <= 18) return "moderate";
    return "hard";
  }

  const mapDifficultyToTrancheAge = (difficulty: string): string => {
    switch (difficulty) {
      case "easy": return "5-60";
      case "moderate": return "12-60";
      case "hard": return "18-60";
      default: return "12-60";
    }
  }

  const isValidImagePath = (path: string): boolean => {
    return typeof path === "string" && path.trim() !== "" && path.startsWith("/uploads/");
  }

  const constructImageUrl = (path: string): string | null => {
    if (!isValidImagePath(path)) return null;
    try {
      return new URL(path, BASE_URL).href;
    } catch (e) {
      console.error(`Invalid image URL: ${path}`, e);
      return null;
    }
  }

  const loadTours = async () => {
    try {
      const response = await fetch("http://localhost:8080/activities", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch tours: ${response.statusText}`)
      }

      const data = await response.json()
      const transformedTours: Tour[] = data.map((activity: any) => ({
        id: activity.id.toString(),
        title: activity.nom,
        description: activity.description || "No description provided",
        short_description: activity.description ? activity.description.slice(0, 100) + "..." : "No description",
        price: activity.prix,
        duration_hours: activity.duree / 60,
        min_participants: activity.nbMinPersonne,
        max_participants: activity.nbMaxPersonne,
        difficulty_level: mapTrancheAgeToDifficulty(activity.trancheAge),
        features: activity.included || [],
        image_urls: activity.images
          ? activity.images
              .filter((img: string) => isValidImagePath(img))
              .map((img: string) => constructImageUrl(img))
              .filter((url: string | null): url is string => url !== null)
          : [],
        location: activity.type,
        created_at: activity.createdAt || new Date().toISOString(),
        updated_at: activity.updatedAt || new Date().toISOString(),
      }))
      setTours(transformedTours)
    } catch (error) {
      console.error("Error loading tours:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les tours",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterTours = () => {
    let filtered = tours

    if (searchTerm) {
      filtered = filtered.filter(
        (tour) =>
          tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((tour) => tour.difficulty_level === difficultyFilter)
    }

    setFilteredTours(filtered)
  }

  const createTour = async (tourData: Omit<Tour, "id" | "created_at" | "updated_at">, files?: File[]) => {
    try {
      const formData = new FormData()
      formData.append("nom", tourData.title)
      formData.append("type", tourData.location)
      formData.append("prix", tourData.price.toString())
      formData.append("duree", Math.round(tourData.duration_hours * 60).toString())
      formData.append("nbMinPersonne", tourData.min_participants.toString())
      formData.append("nbMaxPersonne", tourData.max_participants.toString())
      formData.append("trancheAge", mapDifficultyToTrancheAge(tourData.difficulty_level))
      formData.append("description", tourData.description)
      tourData.features.forEach(feature => formData.append("included", feature))
      if (files && files.length > 0) {
        files.forEach((file) => formData.append("files", file))
      }

      const response = await fetch("http://localhost:8080/activities/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to create tour: ${response.statusText}`)
      }

      const newTour = await response.json()
      const transformedTour: Tour = {
        id: newTour.id.toString(),
        title: newTour.nom,
        description: newTour.description || "No description provided",
        short_description: newTour.description ? newTour.description.slice(0, 100) + "..." : "No description",
        price: newTour.prix,
        duration_hours: newTour.duree / 60,
        min_participants: newTour.nbMinPersonne,
        max_participants: newTour.nbMaxPersonne,
        difficulty_level: mapTrancheAgeToDifficulty(newTour.trancheAge),
        features: newTour.included || [],
        image_urls: newTour.images
          ? newTour.images
              .filter((img: string) => isValidImagePath(img))
              .map((img: string) => constructImageUrl(img))
              .filter((url: string | null): url is string => url !== null)
          : [],
        location: newTour.type,
        created_at: newTour.createdAt || new Date().toISOString(),
        updated_at: newTour.updatedAt || new Date().toISOString(),
      }

      setTours([transformedTour, ...tours])
      setIsCreateDialogOpen(false)
      toast({
        title: "Succès",
        description: "Tour créé avec succès",
      })
    } catch (error) {
      console.error("Error creating tour:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le tour",
        variant: "destructive",
      })
    }
  }

  const updateTour = async (tourId: string, updates: Partial<Tour>, newFiles?: File[], photosToDelete?: string[]) => {
    try {
      const tour = tours.find(t => t.id === tourId)
      if (!tour) throw new Error("Tour not found")

      const formData = new FormData()
      formData.append("nom", updates.title || tour.title)
      formData.append("type", updates.location || tour.location)
      formData.append("prix", (updates.price !== undefined ? updates.price : tour.price).toString())
      formData.append("duree", Math.round((updates.duration_hours !== undefined ? updates.duration_hours : tour.duration_hours) * 60).toString())
      formData.append("nbMinPersonne", (updates.min_participants !== undefined ? updates.min_participants : tour.min_participants).toString())
      formData.append("nbMaxPersonne", (updates.max_participants !== undefined ? updates.max_participants : tour.max_participants).toString())
      formData.append("trancheAge", updates.difficulty_level ? mapDifficultyToTrancheAge(updates.difficulty_level) : tour.difficulty_level ? mapDifficultyToTrancheAge(tour.difficulty_level) : "12-60")
      formData.append("description", updates.description || tour.description)
      const features = updates.features || tour.features
      features.forEach(feature => formData.append("included", feature))
      if (newFiles && newFiles.length > 0) {
        newFiles.forEach((file) => formData.append("files", file))
      }
      if (photosToDelete && photosToDelete.length > 0) {
        photosToDelete
          .map(url => url.startsWith(BASE_URL) ? url.replace(BASE_URL, "") : url)
          .filter(url => isValidImagePath(url))
          .forEach((url) => formData.append("deleteImages", url))
      }

      const response = await fetch(`http://localhost:8080/activities/${tourId}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to update tour: ${response.statusText}`)
      }

      const updatedTour = await response.json()
      setTours(tours.map((tour) => (tour.id === tourId ? {
        ...tour,
        title: updatedTour.nom,
        description: updatedTour.description || "No description provided",
        short_description: updatedTour.description ? updatedTour.description.slice(0, 100) + "..." : "No description",
        price: updatedTour.prix,
        duration_hours: updatedTour.duree / 60,
        min_participants: updatedTour.nbMinPersonne,
        max_participants: updatedTour.nbMaxPersonne,
        difficulty_level: mapTrancheAgeToDifficulty(updatedTour.trancheAge),
        features: updatedTour.included || [],
        image_urls: updatedTour.images
          ? updatedTour.images
              .filter((img: string) => isValidImagePath(img))
              .map((img: string) => constructImageUrl(img))
              .filter((url: string | null): url is string => url !== null)
          : [],
        location: updatedTour.type,
        updated_at: updatedTour.updatedAt || new Date().toISOString(),
      } : tour)))
      setIsEditDialogOpen(false)
      toast({
        title: "Succès",
        description: "Tour mis à jour avec succès",
      })
    } catch (error) {
      console.error("Error updating tour:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le tour",
        variant: "destructive",
      })
    }
  }

  const averagePrice = tours.length > 0 ? tours.reduce((sum, t) => sum + t.price, 0) / tours.length : 0

  if (loading) {
    return (
      <ProtectedRoute>
        <RoleGuard allowedRoles={["admin", "super_admin"]}>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des tours...</p>
            </div>
          </div>
        </RoleGuard>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["admin", "super_admin"]}>
        <div
          className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
          inert={isCreateDialogOpen || isEditDialogOpen || isViewDialogOpen ? "" : undefined}
        >
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des tours</h1>
                <p className="text-gray-600">Gérer les tours et aventures disponibles</p>
              </div>
              <div className="flex gap-2">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau tour
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau tour</DialogTitle>
                      <DialogDescription>
                        Ajouter un nouveau tour à votre catalogue
                      </DialogDescription>
                    </DialogHeader>
                    <TourForm onSave={createTour} onCancel={() => setIsCreateDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" asChild>
                  <Link href="/admin">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au tableau de bord
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total tours</p>
                      <p className="text-2xl font-bold text-gray-900">{tours.length}</p>
                    </div>
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prix moyen</p>
                      <p className="text-2xl font-bold text-gray-900">€{averagePrice.toFixed(0)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-amber-600" />
                  Filtres et recherche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher par titre, lieu ou description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrer par difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes difficultés</SelectItem>
                      <SelectItem value="easy">Facile</SelectItem>
                      <SelectItem value="moderate">Modéré</SelectItem>
                      <SelectItem value="hard">Difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                  Liste des tours ({filteredTours.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tour</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Durée</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Difficulté</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTours.map((tour) => (
                        <TableRow key={tour.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">{tour.title}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                {tour.location}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-gray-900">€{tour.price}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1 text-gray-400" />
                              {tour.duration_hours}h
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1 text-gray-400" />
                              {tour.min_participants}-{tour.max_participants}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getDifficultyBadgeColor(tour.difficulty_level)}>
                              {getDifficultyLabel(tour.difficulty_level)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedTour(tour)}
                                  >
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Détails du tour</DialogTitle>
                                    <DialogDescription>
                                      Informations complètes du tour
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedTour && <TourDetailsView tour={selectedTour} />}
                                </DialogContent>
                              </Dialog>
                              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedTour(tour)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Modifier le tour</DialogTitle>
                                    <DialogDescription>
                                      Modifier les informations du tour
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedTour && (
                                    <TourForm
                                      tour={selectedTour}
                                      onSave={(updates, files, photosToDelete) => updateTour(selectedTour.id, updates, files, photosToDelete)}
                                      onCancel={() => setIsEditDialogOpen(false)}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  )
}

interface TourDetailsViewProps {
  tour: Tour
}

function TourDetailsView({ tour }: TourDetailsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium text-gray-600">Titre</Label>
        <p className="text-lg font-semibold text-gray-900">{tour.title}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-600">Description courte</Label>
        <p className="text-sm text-gray-900">{tour.short_description}</p>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-600">Description complète</Label>
        <p className="text-sm text-gray-900 whitespace-pre-wrap">{tour.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Prix</Label>
          <p className="text-sm text-gray-900">€{tour.price}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Durée</Label>
          <p className="text-sm text-gray-900">{tour.duration_hours} heures</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Participants</Label>
          <p className="text-sm text-gray-900">{tour.min_participants}-{tour.max_participants}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Difficulté</Label>
          <Badge className={getDifficultyBadgeColor(tour.difficulty_level)}>
            {getDifficultyLabel(tour.difficulty_level)}
          </Badge>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-600">Lieu</Label>
        <p className="text-sm text-gray-900">{tour.location}</p>
      </div>

      {tour.features && tour.features.length > 0 && (
        <div>
          <Label className="text-sm font-medium text-gray-600">Caractéristiques</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {tour.features.map((feature, index) => (
              <Badge key={index} variant="outline">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {tour.image_urls && tour.image_urls.length > 0 && (
        <div>
          <Label className="text-sm font-medium text-gray-600">Images</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {tour.image_urls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Tour image ${index + 1}`}
                width={100}
                height={100}
                className="object-cover rounded"
                onError={() => console.error(`Failed to load image: ${url}`)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Créé le</Label>
          <p className="text-sm text-gray-900">{new Date(tour.created_at).toLocaleString("fr-FR")}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Modifié le</Label>
          <p className="text-sm text-gray-900">{new Date(tour.updated_at).toLocaleString("fr-FR")}</p>
        </div>
      </div>
    </div>
  )
}

interface TourFormProps {
  tour?: Tour
  onSave: (tourData: Omit<Tour, "id" | "created_at" | "updated_at">, files?: File[], photosToDelete?: string[]) => void
  onCancel: () => void
}

function TourForm({ tour, onSave, onCancel }: TourFormProps) {
  const [formData, setFormData] = useState({
    title: tour?.title || "",
    short_description: tour?.short_description || "",
    description: tour?.description || "",
    price: tour?.price || 0,
    duration_hours: tour?.duration_hours || 1,
    min_participants: tour?.min_participants || 1,
    max_participants: tour?.max_participants || 8,
    difficulty_level: tour?.difficulty_level || "moderate",
    location: tour?.location || "",
    features: tour?.features?.join(", ") || "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [photosToDelete, setPhotosToDelete] = useState<string[]>([])
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tourData = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f),
    }
    onSave(tourData, files, photosToDelete)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const validFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
      )
      if (validFiles.length !== e.target.files.length) {
        toast({
          title: "Erreur",
          description: "Certains fichiers sont invalides (taille > 5MB ou non-image).",
          variant: "destructive",
        })
      }
      setFiles(validFiles)
    }
  }

  const handleDeletePhoto = (url: string) => {
    setPhotosToDelete([...photosToDelete, url])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre *</Label>
        <Input
          id="title"
          ref={titleInputRef}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="short_description">Description courte *</Label>
        <Input
          id="short_description"
          value={formData.short_description}
          onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description complète *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Prix (€) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration_hours">Durée (heures) *</Label>
          <Input
            id="duration_hours"
            type="number"
            step="0.1"
            value={formData.duration_hours}
            onChange={(e) => setFormData({ ...formData, duration_hours: Number.parseFloat(e.target.value) || 1 })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min_participants">Participants minimum *</Label>
          <Input
            id="min_participants"
            type="number"
            value={formData.min_participants}
            onChange={(e) => setFormData({ ...formData, min_participants: Number.parseInt(e.target.value) || 1 })}
            required
          />
        </div>
        <div>
          <Label htmlFor="max_participants">Participants maximum *</Label>
          <Input
            id="max_participants"
            type="number"
            value={formData.max_participants}
            onChange={(e) => setFormData({ ...formData, max_participants: Number.parseInt(e.target.value) || 8 })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="difficulty_level">Difficulté *</Label>
          <Select
            value={formData.difficulty_level}
            onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Facile</SelectItem>
              <SelectItem value="moderate">Modéré</SelectItem>
              <SelectItem value="hard">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Lieu *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
        <Input
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="guide_professionnel, équipement_fourni, photos_incluses"
        />
      </div>

      <div>
        <Label htmlFor="images">Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {tour && tour.image_urls && tour.image_urls.length > 0 && (
        <div>
          <Label>Images existantes</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {tour.image_urls
              .filter((url) => !photosToDelete.includes(url))
              .map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Tour image ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                    onError={() => console.error(`Failed to load image: ${url}`)}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => handleDeletePhoto(url)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
          {tour ? "Mettre à jour" : "Créer"}
        </Button>
      </div>
    </form>
  )
}
