"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, ArrowLeft, Save, Globe, Mail, CreditCard, Shield } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { supabase } from "@/lib/supabase/admin"
import { useToast } from "@/hooks/use-toast"
import { HeroSection } from "@/components/hero-section"
import { Header } from "@/components/header"

interface SystemSettings {
  site_maintenance: { enabled: boolean; message: string }
  booking_settings: { advance_booking_days: number; cancellation_hours: number; max_participants_per_booking: number }
  payment_settings: { accepted_methods: string[]; currency: string; tax_rate: number }
  email_settings: { smtp_host: string; smtp_port: number; from_email: string }
  social_media: { facebook: string; instagram: string; twitter: string; youtube: string }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase.from("system_settings").select("*")

      if (error) throw error

      const settingsMap: any = {}
      data?.forEach((setting) => {
        settingsMap[setting.setting_key] = setting.setting_value
      })

      setSettings(settingsMap as SystemSettings)
    } catch (error) {
      console.error("Error loading settings:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)

      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString(),
      }))

      for (const update of updates) {
        const { error } = await supabase.from("system_settings").upsert(update, { onConflict: "setting_key" })

        if (error) throw error
      }

      toast({
        title: "Succès",
        description: "Paramètres sauvegardés avec succès",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    if (!settings) return
    setSettings({ ...settings, [key]: value })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <RoleGuard allowedRoles={["super_admin"]}>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des paramètres...</p>
            </div>
          </div>
        </RoleGuard>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute children={undefined}>
      <Header />
      <RoleGuard allowedRoles={["super_admin"]} children={undefined}>
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
                <h1 className="text-3xl font-bold text-gray-900">Paramètres système</h1>
                <p className="text-gray-600">Configuration générale de l'application</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={saveSettings}
                  disabled={saving}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au tableau de bord
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Settings Tabs */}
            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
              <CardContent className="p-6">
                <Tabs defaultValue="general" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="general">
                      <Globe className="w-4 h-4 mr-2" />
                      Général
                    </TabsTrigger>
                    <TabsTrigger value="booking">
                      <Settings className="w-4 h-4 mr-2" />
                      Réservations
                    </TabsTrigger>
                    <TabsTrigger value="payment">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Paiements
                    </TabsTrigger>
                    <TabsTrigger value="email">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="social">
                      <Shield className="w-4 h-4 mr-2" />
                      Réseaux sociaux
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mode maintenance</CardTitle>
                        <CardDescription>Activer le mode maintenance pour effectuer des mises à jour</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="maintenance"
                            checked={settings?.site_maintenance?.enabled || false}
                            onCheckedChange={(checked) =>
                              updateSetting("site_maintenance", {
                                ...settings?.site_maintenance,
                                enabled: checked,
                              })
                            }
                          />
                          <Label htmlFor="maintenance">Activer le mode maintenance</Label>
                        </div>
                        <div>
                          <Label htmlFor="maintenance-message">Message de maintenance</Label>
                          <Textarea
                            id="maintenance-message"
                            value={settings?.site_maintenance?.message || ""}
                            onChange={(e) =>
                              updateSetting("site_maintenance", {
                                ...settings?.site_maintenance,
                                message: e.target.value,
                              })
                            }
                            placeholder="Site en maintenance. Nous reviendrons bientôt!"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="booking" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Paramètres de réservation</CardTitle>
                        <CardDescription>Configuration des règles de réservation</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="advance-days">Réservation à l'avance (jours)</Label>
                            <Input
                              id="advance-days"
                              type="number"
                              value={settings?.booking_settings?.advance_booking_days || 30}
                              onChange={(e) =>
                                updateSetting("booking_settings", {
                                  ...settings?.booking_settings,
                                  advance_booking_days: Number.parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="cancellation-hours">Annulation (heures avant)</Label>
                            <Input
                              id="cancellation-hours"
                              type="number"
                              value={settings?.booking_settings?.cancellation_hours || 24}
                              onChange={(e) =>
                                updateSetting("booking_settings", {
                                  ...settings?.booking_settings,
                                  cancellation_hours: Number.parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="max-participants">Participants max par réservation</Label>
                            <Input
                              id="max-participants"
                              type="number"
                              value={settings?.booking_settings?.max_participants_per_booking || 8}
                              onChange={(e) =>
                                updateSetting("booking_settings", {
                                  ...settings?.booking_settings,
                                  max_participants_per_booking: Number.parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="payment" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Paramètres de paiement</CardTitle>
                        <CardDescription>Configuration des options de paiement</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="currency">Devise</Label>
                            <Input
                              id="currency"
                              value={settings?.payment_settings?.currency || "EUR"}
                              onChange={(e) =>
                                updateSetting("payment_settings", {
                                  ...settings?.payment_settings,
                                  currency: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="tax-rate">Taux de taxe (%)</Label>
                            <Input
                              id="tax-rate"
                              type="number"
                              step="0.01"
                              value={settings?.payment_settings?.tax_rate || 0.2}
                              onChange={(e) =>
                                updateSetting("payment_settings", {
                                  ...settings?.payment_settings,
                                  tax_rate: Number.parseFloat(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Configuration email</CardTitle>
                        <CardDescription>Paramètres SMTP pour l'envoi d'emails</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="smtp-host">Serveur SMTP</Label>
                            <Input
                              id="smtp-host"
                              value={settings?.email_settings?.smtp_host || ""}
                              onChange={(e) =>
                                updateSetting("email_settings", {
                                  ...settings?.email_settings,
                                  smtp_host: e.target.value,
                                })
                              }
                              placeholder="smtp.gmail.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="smtp-port">Port SMTP</Label>
                            <Input
                              id="smtp-port"
                              type="number"
                              value={settings?.email_settings?.smtp_port || 587}
                              onChange={(e) =>
                                updateSetting("email_settings", {
                                  ...settings?.email_settings,
                                  smtp_port: Number.parseInt(e.target.value),
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="from-email">Email expéditeur</Label>
                          <Input
                            id="from-email"
                            type="email"
                            value={settings?.email_settings?.from_email || ""}
                            onChange={(e) =>
                              updateSetting("email_settings", {
                                ...settings?.email_settings,
                                from_email: e.target.value,
                              })
                            }
                            placeholder="noreply@hammetadventure.com"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Réseaux sociaux</CardTitle>
                        <CardDescription>Liens vers vos profils de réseaux sociaux</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                              id="facebook"
                              value={settings?.social_media?.facebook || ""}
                              onChange={(e) =>
                                updateSetting("social_media", {
                                  ...settings?.social_media,
                                  facebook: e.target.value,
                                })
                              }
                              placeholder="https://facebook.com/hammetadventure"
                            />
                          </div>
                          <div>
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                              id="instagram"
                              value={settings?.social_media?.instagram || ""}
                              onChange={(e) =>
                                updateSetting("social_media", {
                                  ...settings?.social_media,
                                  instagram: e.target.value,
                                })
                              }
                              placeholder="https://instagram.com/hammetadventure"
                            />
                          </div>
                          <div>
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                              id="twitter"
                              value={settings?.social_media?.twitter || ""}
                              onChange={(e) =>
                                updateSetting("social_media", {
                                  ...settings?.social_media,
                                  twitter: e.target.value,
                                })
                              }
                              placeholder="https://twitter.com/hammetadventure"
                            />
                          </div>
                          <div>
                            <Label htmlFor="youtube">YouTube</Label>
                            <Input
                              id="youtube"
                              value={settings?.social_media?.youtube || ""}
                              onChange={(e) =>
                                updateSetting("social_media", {
                                  ...settings?.social_media,
                                  youtube: e.target.value,
                                })
                              }
                              placeholder="https://youtube.com/hammetadventure"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </RoleGuard>
    </ProtectedRoute>
  )
}
