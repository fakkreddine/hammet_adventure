"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Shield, Settings, ArrowLeft, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"

// Mock admin data
const adminStats = {
  totalUsers: 1247,
  activeBookings: 89,
  pendingReviews: 12,
  systemAlerts: 3,
}

const recentUsers = [
  { id: "1", name: "Marie Dubois", email: "marie@example.com", status: "active", joinDate: "2024-02-10" },
  { id: "2", name: "Ahmed Ben Ali", email: "ahmed@example.com", status: "pending", joinDate: "2024-02-09" },
  { id: "3", name: "Sophie Martin", email: "sophie@example.com", status: "active", joinDate: "2024-02-08" },
]

const systemAlerts = [
  { id: "1", type: "warning", message: "Taux d'utilisation serveur élevé (85%)", time: "Il y a 2h" },
  { id: "2", type: "info", message: "Mise à jour système programmée pour demain", time: "Il y a 4h" },
  { id: "3", type: "error", message: "Échec de sauvegarde automatique", time: "Il y a 6h" },
]

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <RoleGuard >
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
                <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
                <p className="text-gray-600">Tableau de bord administrateur</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/protected">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Link>
              </Button>
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
                        <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers}</p>
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
                        <p className="text-sm font-medium text-gray-600">Réservations actives</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.activeBookings}</p>
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
                        <p className="text-sm font-medium text-gray-600">Avis en attente</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.pendingReviews}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-yellow-600" />
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
                        <p className="text-sm font-medium text-gray-600">Alertes système</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.systemAlerts}</p>
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
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {user.status === "active" ? "Actif" : "En attente"}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(user.joinDate).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      Voir tous les utilisateurs
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* System Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                      Alertes système
                    </CardTitle>
                    <CardDescription>Notifications et alertes importantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              alert.type === "error"
                                ? "bg-red-500"
                                : alert.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50">
                      <Users className="w-5 h-5" />
                      <span>Gérer les utilisateurs</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50">
                      <Calendar className="w-5 h-5" />
                      <span>Gérer les réservations</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex-col space-y-2 bg-transparent hover:bg-amber-50">
                      <Shield className="w-5 h-5" />
                      <span>Paramètres système</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  )
}
