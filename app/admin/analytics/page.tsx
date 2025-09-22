"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, Users, Calendar, DollarSign, Download, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useToast } from "@/hooks/use-toast"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import { Header } from "@/components/header"

interface AnalyticsData {
  bookingsByMonth: Array<{ month: string; bookings: number; revenue: number }>
  tourPopularity: Array<{ name: string; bookings: number }>
  userGrowth: Array<{ month: string; users: number }>
  revenueByTour: Array<{ name: string; revenue: number }>
  bookingStatus: Array<{ name: string; value: number }>
  paymentStatus: Array<{ name: string; value: number }>
}

const COLORS = ["#d97706", "#b45309", "#92400e", "#78350f", "#451a03"]

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("6months")
  const { toast } = useToast()

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)

      // Fetch data from APIs
      const [usersResponse, bookingsResponse, mostViewedResponse] = await Promise.all([
        fetch("http://localhost:8080/api/analytics/users").then((res) => res.json()),
        fetch("http://localhost:8080/api/analytics/bookings").then((res) => res.json()),
        fetch("http://localhost:8080/analytics/most-viewed").then((res) => res.json()),
      ])

      // Process data
      const processedData = processAnalyticsData(usersResponse, bookingsResponse, mostViewedResponse)
      setAnalyticsData(processedData)
    } catch (error) {
      console.error("Error loading analytics data:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les données analytiques",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const processAnalyticsData = (
  usersData: any,
  bookingsData: any,
  mostViewedData: any,
  startDate?: Date,
  endDate?: Date
): AnalyticsData => {
  // Initialize default data structure
  const bookingsByMonth: Array<{ month: string; bookings: number; revenue: number }> = []
  const userGrowth: Array<{ month: string; users: number }> = []
  const tourPopularity: Array<{ name: string; bookings: number }> = []
  const revenueByTour: Array<{ name: string; revenue: number }> = []
  const bookingStatus: Array<{ name: string; value: number }> = []
  const paymentStatus: Array<{ name: string; value: number }> = []

  // Handle date range for bookingsByMonth and userGrowth
  const endDateFinal = endDate || new Date()
  const startDateFinal = startDate || new Date()
  switch (timeRange) {
    case "1month":
      startDateFinal.setMonth(endDateFinal.getMonth() - 1)
      break
    case "3months":
      startDateFinal.setMonth(endDateFinal.getMonth() - 3)
      break
    case "6months":
      startDateFinal.setMonth(endDateFinal.getMonth() - 6)
      break
    case "1year":
      startDateFinal.setFullYear(endDateFinal.getFullYear() - 1)
      break
  }

  // Initialize months for bookingsByMonth and userGrowth
  const monthlyData = new Map()
  const userMonthlyData = new Map()
  const current = new Date(startDateFinal)
  while (current <= endDateFinal) {
    const monthKey = current.toISOString().slice(0, 7) // YYYY-MM
    monthlyData.set(monthKey, { bookings: 0, revenue: 0 })
    userMonthlyData.set(monthKey, 0)
    current.setMonth(current.getMonth() + 1)
  }

  // Process bookings by month (from bookingsData.revenuePerMonth)
  Object.entries(bookingsData.revenuePerMonth || {}).forEach(([month, data]: [string, any]) => {
    if (monthlyData.has(month)) {
      monthlyData.set(month, {
        bookings: data.bookings || 0,
        revenue: data.revenue || 0,
      })
    }
  })

  bookingsByMonth.push(
    ...Array.from(monthlyData.entries()).map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      bookings: data.bookings,
      revenue: data.revenue,
    }))
  )

  // Process user growth (mocked since API doesn't provide monthly user data)
  userMonthlyData.set(new Date().toISOString().slice(0, 7), usersData.totalUsers || 0)
  userGrowth.push(
    ...Array.from(userMonthlyData.entries()).map(([month, users]) => ({
      month: new Date(month + "-01").toLocaleDateString("fr-FR", { month: "short", year: "numeric" }),
      users,
    }))
  )

  // Process tour popularity (from bookingsData.bookingsPerActivity)
  tourPopularity.push(
    ...Object.entries(bookingsData.bookingsPerActivity || {}).map(([name, bookings]) => ({
      name,
      bookings: Number(bookings),
    })).sort((a, b) => b.bookings - a.bookings).slice(0, 5)
  )

  // Process revenue by tour (mocked since API doesn't provide revenue per tour)
  revenueByTour.push(
    ...Object.entries(bookingsData.bookingsPerActivity || {}).map(([name, bookings]) => ({
      name,
      revenue: bookingsData.totalRevenue
        ? (bookingsData.totalRevenue / bookingsData.totalBookings) * Number(bookings)
        : 0,
    })).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  )

  // Process booking status (from bookingsData.bookingsPerStatus)
  bookingStatus.push(
    ...Object.entries(bookingsData.bookingsPerStatus || {}).map(([name, value]) => ({
      name:
        name === "confirmed"
          ? "Confirmées"
          : name === "pending"
            ? "En attente"
            : name === "cancelled"
              ? "Annulées"
              : name === "completed"
                ? "Terminées"
                : name,
      value: Number(value),
    }))
  )

  // Process payment status (mocked since API doesn't provide payment status)
  paymentStatus.push(
    ...Object.entries(bookingsData.bookingsPerStatus || {}).map(([name, value]) => ({
      name:
        name === "confirmed"
          ? "Payé"
          : name === "pending"
            ? "En attente"
            : name === "cancelled"
              ? "Remboursé"
              : name,
      value: Number(value),
    }))
  )

  return {
    bookingsByMonth,
    tourPopularity,
    userGrowth,
    revenueByTour,
    bookingStatus,
    paymentStatus,
  }
}
  const exportData = () => {
    if (!analyticsData) return

    const dataToExport = {
      generatedAt: new Date().toISOString(),
      timeRange,
      data: analyticsData,
    }

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${timeRange}-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Succès",
      description: "Données exportées avec succès",
    })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <Header />
        <RoleGuard allowedRoles={["admin", "super_admin"]}>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des analyses...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Analyses & Rapports</h1>
                <p className="text-gray-600">Statistiques détaillées et analyses de performance</p>
              </div>
              <div className="flex gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Dernier mois</SelectItem>
                    <SelectItem value="3months">3 derniers mois</SelectItem>
                    <SelectItem value="6months">6 derniers mois</SelectItem>
                    <SelectItem value="1year">Dernière année</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au tableau de bord
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total réservations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.bookingsByMonth.reduce((sum, item) => sum + item.bookings, 0) || 0}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                      <p className="text-2xl font-bold text-gray-900">
                        €{analyticsData?.bookingsByMonth.reduce((sum, item) => sum + item.revenue, 0).toFixed(0) || 0}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Nouveaux utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.userGrowth.reduce((sum, item) => sum + item.users, 0) || 0}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Taux de conversion</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analyticsData?.bookingStatus.length > 0
                          ? Math.round(
                              ((analyticsData.bookingStatus.find((s) => s.name === "Confirmées")?.value || 0) /
                                analyticsData.bookingStatus.reduce((sum, s) => sum + s.value, 0)) *
                                100
                            )
                          : 0}
                        %
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bookings & Revenue Over Time */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                    Réservations et revenus dans le temps
                  </CardTitle>
                  <CardDescription>Évolution mensuelle des réservations et revenus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData?.bookingsByMonth || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="bookings" fill="#d97706" name="Réservations" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#b45309"
                          strokeWidth={2}
                          name="Revenus (€)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-amber-600" />
                    Croissance des utilisateurs
                  </CardTitle>
                  <CardDescription>Nouveaux utilisateurs par mois</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData?.userGrowth || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#d97706" name="Nouveaux utilisateurs" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Tour Popularity */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                    Popularité des tours
                  </CardTitle>
                  <CardDescription>Top 5 des tours les plus réservés</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData?.tourPopularity || []} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#d97706" name="Réservations" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue by Tour */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-amber-600" />
                    Revenus par tour
                  </CardTitle>
                  <CardDescription>Top 5 des tours les plus rentables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData?.revenueByTour || []} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={120} />
                        <Tooltip formatter={(value) => [`€${value}`, "Revenus"]} />
                        <Bar dataKey="revenue" fill="#b45309" name="Revenus (€)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row 3 - Pie Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Status Distribution */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-amber-600" />
                    Répartition des statuts de réservation
                  </CardTitle>
                  <CardDescription>Distribution des statuts des réservations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={analyticsData?.bookingStatus || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {(analyticsData?.bookingStatus || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Status Distribution */}
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-amber-600" />
                    Répartition des statuts de paiement
                  </CardTitle>
                  <CardDescription>Distribution des statuts de paiement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={analyticsData?.paymentStatus || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {(analyticsData?.paymentStatus || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  )
}