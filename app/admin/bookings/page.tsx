"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, Search, Filter, Eye, ArrowLeft, Users, DollarSign, Clock, MapPin, RefreshCw } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"

interface Booking {
  id: string
  user_id: string
  tour_id: string
  booking_date: string
  booking_time: string
  participants: number
  total_price: number
  status: string
  payment_status: string
  payment_method: string | null
  special_requests: string | null
  promo_code: string | null
  discount_amount: number
  created_at: string
  updated_at: string | null
  user_profiles: {
    first_name: string
    last_name: string
    phone: string
  }
  tours: {
    title: string
    location: string
  }
}

export default function BookingsManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false)
  const [syncMessage, setSyncMessage] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    filterBookings()
  }, [bookings, searchTerm, statusFilter, paymentFilter])

  const loadBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/bookings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`)
      }

      const data = await response.json()
      const transformedBookings: Booking[] = data.map((booking: any) => {
        // Extract time from timeSlot (e.g., "09:00-11:00" -> "09:00")
        const timeSlot = booking.timeSlot || ''
        const bookingTime = timeSlot.includes('-') ? timeSlot.split('-')[0].trim() : ''

        // Fallback for user profile if null
        const firstName = booking.user.prenom || ''
        const lastName = booking.user.nom || ''
        const displayName = firstName || lastName ? `${firstName} ${lastName}`.trim() : booking.user.email || 'Utilisateur inconnu'
        const phone = booking.user.numero || 'Non fourni'

        return {
          id: booking.id.toString(),
          user_id: booking.user.id.toString(),
          tour_id: booking.activity.id.toString(),
          booking_date: booking.activityDate || '',  // No split needed; it's just YYYY-MM-DD
          booking_time: bookingTime,  // From timeSlot
          participants: booking.nbPersonnes || 0,
          total_price: booking.amountToPay || 0,
          status: (booking.status || '').toLowerCase() || (booking.paymentStatus === "PENDING" ? "pending" : "confirmed"),
          payment_status: (booking.paymentStatus || '').toLowerCase(),
          payment_method: null,  // TODO: Map if API adds it
          special_requests: null,  // TODO: Map if API adds it
          promo_code: null,  // TODO: Map if API adds it
          discount_amount: 0,  // TODO: Map if API adds it
          created_at: booking.bookingDate || '',
          updated_at: booking.updatedAt || null,
          user_profiles: {
            first_name: firstName,
            last_name: lastName,
            phone,
          },
          tours: {
            title: booking.activity.nom || '',
            location: booking.activity.type || '',
          },
        }
      })
      setBookings(transformedBookings)
    } catch (error) {
      console.error("Error loading bookings:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les réservations",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSyncAll = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sync/payments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to sync payments: ${response.statusText}`)
      }

      const data = await response.text()
      setSyncMessage(data)
      await loadBookings()
    } catch (error) {
      console.error("Error syncing payments:", error)
      setSyncMessage('❌ Failed to sync payments. Please try again.')
    } finally {
      setIsSyncModalOpen(true)
    }
  }

  const filterBookings = () => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.user_profiles.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.user_profiles.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.tours.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter)
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter((booking) => booking.payment_status === paymentFilter)
    }

    setFilteredBookings(filtered)
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8080/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers if required, e.g., Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus.toUpperCase() }),  // Uppercase for API consistency
      })

      if (!response.ok) {
        throw new Error(`Failed to update booking status: ${response.statusText}`)
      }

      const updatedBooking = await response.json()
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                status: updatedBooking.status?.toLowerCase() || newStatus,
                updated_at: updatedBooking.updatedAt || new Date().toISOString(),
              }
            : booking,
        ),
      )
      toast({
        title: "Succès",
        description: "Statut de la réservation mis à jour",
      })
    } catch (error) {
      console.error("Error updating booking status:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      })
    }
  }

  const updatePaymentStatus = async (bookingId: string, newPaymentStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8080/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers if required, e.g., Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus: newPaymentStatus.toUpperCase() }),  // Uppercase for API consistency
      })

      if (!response.ok) {
        throw new Error(`Failed to update payment status: ${response.statusText}`)
      }

      const updatedBooking = await response.json()
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? {
                ...booking,
                payment_status: updatedBooking.paymentStatus?.toLowerCase() || newPaymentStatus,
                updated_at: updatedBooking.updatedAt || new Date().toISOString(),
              }
            : booking,
        ),
      )
      toast({
        title: "Succès",
        description: "Statut de paiement mis à jour",
      })
    } catch (error) {
      console.error("Error updating payment status:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de paiement",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "completed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPaymentBadgeColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "refunded":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée"
      case "pending":
        return "En attente"
      case "cancelled":
        return "Annulée"
      case "completed":
        return "Terminée"
      default:
        return status
    }
  }

  const getPaymentLabel = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "Payé"
      case "pending":
        return "En attente"
      case "refunded":
        return "Remboursé"
      default:
        return paymentStatus
    }
  }

  const totalRevenue = bookings.filter((b) => b.payment_status === "paid").reduce((sum, b) => sum + b.total_price, 0)
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const completedBookings = bookings.filter((b) => b.status === "completed").length

  if (loading) {
    return (
      <ProtectedRoute>
        <Header />
        <RoleGuard allowedRoles={["admin", "super_admin"]}>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des réservations...</p>
            </div>
          </div>
        </RoleGuard>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Header />
      <RoleGuard allowedRoles={["admin", "super_admin"]}>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestion des réservations</h1>
                <p className="text-gray-600">Gérer toutes les réservations et leur statut</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au tableau de bord
                </Link>
              </Button>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total réservations</p>
                      <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingBookings}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmées</p>
                      <p className="text-2xl font-bold text-gray-900">{confirmedBookings}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                      <p className="text-2xl font-bold text-gray-900">€{totalRevenue.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
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
                        placeholder="Rechercher par client, tour ou ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="confirmed">Confirmées</SelectItem>
                      <SelectItem value="completed">Terminées</SelectItem>
                      <SelectItem value="cancelled">Annulées</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrer par paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les paiements</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="paid">Payé</SelectItem>
                      <SelectItem value="refunded">Remboursé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                    Liste des réservations ({filteredBookings.length})
                  </CardTitle>
                  <Button onClick={handleSyncAll} variant="default" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Tour</TableHead>
                        <TableHead>Date & Heure</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Paiement</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map((booking) => {
                        const displayName = booking.user_profiles.first_name || booking.user_profiles.last_name 
                          ? `${booking.user_profiles.first_name} ${booking.user_profiles.last_name}`.trim() 
                          : booking.user_profiles.phone !== 'Non fourni' ? booking.user_profiles.phone : 'Utilisateur inconnu'

                        return (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{displayName}</p>
                                <p className="text-sm text-gray-500">{booking.user_profiles.phone}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{booking.tours.title}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {booking.tours.location}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {new Date(booking.booking_date).toLocaleDateString("fr-FR")}
                                </p>
                                <p className="text-sm text-gray-500">{booking.booking_time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1 text-gray-400" />
                                {booking.participants}
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium text-gray-900">€{booking.total_price.toFixed(2)}</p>
                              {booking.discount_amount > 0 && (
                                <p className="text-sm text-green-600">-€{booking.discount_amount}</p>
                              )}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={booking.status}
                                onValueChange={(newStatus) => updateBookingStatus(booking.id, newStatus)}
                              >
                                <SelectTrigger className="w-32">
                                  <Badge className={getStatusBadgeColor(booking.status)}>
                                    {getStatusLabel(booking.status)}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="confirmed">Confirmée</SelectItem>
                                  <SelectItem value="completed">Terminée</SelectItem>
                                  <SelectItem value="cancelled">Annulée</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={booking.payment_status}
                                onValueChange={(newPaymentStatus) => updatePaymentStatus(booking.id, newPaymentStatus)}
                              >
                                <SelectTrigger className="w-32">
                                  <Badge className={getPaymentBadgeColor(booking.payment_status)}>
                                    {getPaymentLabel(booking.payment_status)}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="paid">Payé</SelectItem>
                                  <SelectItem value="refunded">Remboursé</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                                      <Eye className="w-3 h-3" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Détails de la réservation</DialogTitle>
                                      <DialogDescription>Informations complètes de la réservation</DialogDescription>
                                    </DialogHeader>
                                    {selectedBooking && <BookingDetailsView booking={selectedBooking} />}
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Sync Modal */}
            <Dialog open={isSyncModalOpen} onOpenChange={setIsSyncModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Résultats de la synchronisation</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-lg font-medium">{syncMessage}</p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsSyncModalOpen(false)}>Fermer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  )
}

interface BookingDetailsViewProps {
  booking: Booking
}

function BookingDetailsView({ booking }: BookingDetailsViewProps) {
  const displayName = booking.user_profiles.first_name || booking.user_profiles.last_name 
    ? `${booking.user_profiles.first_name} ${booking.user_profiles.last_name}`.trim() 
    : 'Utilisateur inconnu'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">ID de réservation</Label>
          <p className="text-sm text-gray-900">{booking.id}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Date de création</Label>
          <p className="text-sm text-gray-900">{new Date(booking.created_at).toLocaleString("fr-FR")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Client</Label>
          <p className="text-sm text-gray-900">{displayName}</p>
          <p className="text-sm text-gray-500">{booking.user_profiles.phone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Tour</Label>
          <p className="text-sm text-gray-900">{booking.tours.title}</p>
          <p className="text-sm text-gray-500">{booking.tours.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Date</Label>
          <p className="text-sm text-gray-900">{new Date(booking.booking_date).toLocaleDateString("fr-FR")}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Heure</Label>
          <p className="text-sm text-gray-900">{booking.booking_time}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Participants</Label>
          <p className="text-sm text-gray-900">{booking.participants}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-600">Prix total</Label>
          <p className="text-sm text-gray-900">€{booking.total_price.toFixed(2)}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-600">Méthode de paiement</Label>
          <p className="text-sm text-gray-900">{booking.payment_method || "Non spécifiée"}</p>
        </div>
      </div>

      {booking.promo_code && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Code promo</Label>
            <p className="text-sm text-gray-900">{booking.promo_code}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Remise</Label>
            <p className="text-sm text-gray-900">€{booking.discount_amount}</p>
          </div>
        </div>
      )}

      {booking.special_requests && (
        <div>
          <Label className="text-sm font-medium text-gray-600">Demandes spéciales</Label>
          <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">{booking.special_requests}</p>
        </div>
      )}
    </div>
  )
}