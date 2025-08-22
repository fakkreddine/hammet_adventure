"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Calendar, Shield, LogOut } from "lucide-react"
import { useAuth, useUserProfile } from "@/hooks/use-auth"
import { ProtectedRoute } from "@/components/auth/protected-route"
import Link from "next/link"

export default function ProtectedPage() {
  const { signOut } = useAuth()
  const { profile, loading } = useUserProfile()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
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
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">Bienvenue dans votre espace personnel</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Retour à l'accueil</Link>
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-amber-600" />
                    Profil utilisateur
                  </CardTitle>
                  <CardDescription>Vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                  ) : profile ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {profile.firstName.charAt(0)}
                            {profile.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{profile.fullName}</h3>
                          <p className="text-sm text-gray-600">
                            Membre depuis {new Date(profile.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                          <Mail className="w-4 h-4 text-amber-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Email</p>
                            <p className="text-sm text-gray-600">{profile.email}</p>
                            {profile.emailConfirmed ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                <Shield className="w-3 h-3 mr-1" />
                                Vérifié
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                En attente de vérification
                              </span>
                            )}
                          </div>
                        </div>

                        {profile.phone && (
                          <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                            <Phone className="w-4 h-4 text-amber-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Téléphone</p>
                              <p className="text-sm text-gray-600">{profile.phone}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Impossible de charger le profil</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    asChild
                    className="w-full justify-start bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  >
                    <Link href="/booking">
                      <Calendar className="w-4 h-4 mr-2" />
                      Nouvelle réservation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/profile/edit">
                      <User className="w-4 h-4 mr-2" />
                      Modifier le profil
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/bookings">Mes réservations</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <Link href="/profile/change-password">
                      <Shield className="w-4 h-4 mr-2" />
                      Changer le mot de passe
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
