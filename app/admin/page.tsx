"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Settings, ArrowLeft, TrendingUp, AlertTriangle, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"
import { getMockAdminStats, getMockSystemAlerts } from "@/lib/mock-data"
import { Header } from "@/components/header"

interface AdminStats {
  userCount: number
  bookingStats: {
    total_bookings: number
    pending_bookings: number
    confirmed_bookings: number
    completed_bookings: number
    cancelled_bookings: number
    total_revenue: number
    monthly_revenue: number
  }
  pendingReviews: number
  recentBookings: any[]
}

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Simulate loading delay (optional, remove if not needed)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Fetch admin stats from mock data
        const adminStats = getMockAdminStats()
        setStats(adminStats)

        // Fetch recent users from API
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`)
        }

        const data = await response.json()
         setTotalUsers(data.users.length)
        // Transform API response to match User interface
        const transformedUsers: User[] = data.users.map((user: any) => ({
          id: user.id,
          first_name: user.user_metadata.first_name || "Unknown",
          last_name: user.user_metadata.last_name || "User",
          email: user.email || "No email",
          created_at: user.created_at,
        }))
        // Sort users by created_at (most recent first) and limit to 5
        const sortedUsers = transformedUsers
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
        setRecentUsers(sortedUsers)
        
      } catch (error) {
        console.error("Error loading admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const systemAlerts = getMockSystemAlerts()

  if (loading) {
    return (
      <><Header /><div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div></>
    )
  }

  return (<><Header /><div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600">Tableau de bord administrateur - Mode démonstration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/settings">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Utilisateurs totaux</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Réservations totales</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.bookingStats.total_bookings || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus mensuels</p>
                  <p className="text-2xl font-bold text-gray-900">€{stats?.bookingStats.monthly_revenue || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avis en attente</p>
                  <p className="text-2xl font-bold text-gray-900">To be constructed</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-amber-600" />
                Utilisateurs récents
              </CardTitle>
              <CardDescription>Derniers utilisateurs inscrits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {(user.first_name || "U").charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(user.created_at).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Aucun utilisateur récent</p>
                )}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/admin/users">Voir tous les utilisateurs</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                État du système
              </CardTitle>
              <CardDescription>Notifications et alertes importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${alert.type === "error"
                          ? "bg-red-500"
                          : alert.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8"
      >
        <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-amber-600" />
              Actions rapides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50" asChild>
                <Link href="/admin/users">
                  <Users className="w-5 h-5" />
                  <span>Gérer les utilisateurs</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50" asChild>
                <Link href="/admin/bookings">
                  <Calendar className="w-5 h-5" />
                  <span>Gérer les réservations</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50" asChild>
                <Link href="/admin/tours">
                  <MapPin className="w-5 h-5" />
                  <span>Gérer les tours</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50" asChild>
                <Link href="/admin/analytics">
                  <TrendingUp className="w-5 h-5" />
                  <span>Analyses & Rapports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </div></>
  )
}
