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
import { Users, Search, Filter, Edit, ArrowLeft, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { supabase } from "@/lib/supabase/admin"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  phone: string
  role: string
  permissions: string[]
  avatar_url: string
  created_at: string
  updated_at: string
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter])

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const apiData = await response.json()
      const usersData = apiData.users || []

      const transformedUsers: UserProfile[] = usersData.map((user: any) => {
        let firstName = ''
        let lastName = ''
        const metadata = user.user_metadata || {}

        if (metadata.first_name && metadata.last_name) {
          firstName = metadata.first_name
          lastName = metadata.last_name
        } else if (metadata.full_name || metadata.name) {
          const fullName = metadata.full_name || metadata.name
          const names = fullName.split(' ')
          firstName = names[0] || ''
          lastName = names.slice(1).join(' ') || ''
        }

        return {
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          phone: user.phone || metadata.phone || '',
          role: 'customer', // Default; can be overridden by fetching from user_profiles if needed
          permissions: [],
          avatar_url: metadata.avatar_url || metadata.picture || '',
          created_at: user.created_at,
          updated_at: user.updated_at,
        }
      })

      setUsers(transformedUsers)
    } catch (error) {
      console.error("Error loading users:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .upsert(
          { 
            id: userId, 
            role: newRole, 
            updated_at: new Date().toISOString() 
          },
          { onConflict: 'id' }
        )

      if (error) throw error

      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      toast({
        title: "Succès",
        description: "Rôle utilisateur mis à jour",
      })
    } catch (error) {
      console.error("Error updating user role:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le rôle",
        variant: "destructive",
      })
    }
  }

  const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from("user_profiles")
        .upsert(
          { 
            id: userId, 
            ...updates, 
            updated_at: new Date().toISOString() 
          },
          { onConflict: 'id' }
        )

      if (error) throw error

      setUsers(users.map((user) => (user.id === userId ? { ...user, ...updates } : user)))
      setIsEditDialogOpen(false)
      toast({
        title: "Succès",
        description: "Profil utilisateur mis à jour",
      })
    } catch (error) {
      console.error("Error updating user profile:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "admin":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "customer":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Administrateur"
      case "customer":
        return "Client"
      default:
        return role
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <Header />
        <RoleGuard allowedRoles={["admin", "super_admin"]}>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des utilisateurs...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
                <p className="text-gray-600">Gérer les comptes utilisateurs et leurs permissions</p>
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
                      <p className="text-sm font-medium text-gray-600">Total utilisateurs</p>
                      <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clients</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users.filter((u) => u.role === "customer").length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Administrateurs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users.filter((u) => u.role === "admin").length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Super Admins</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {users.filter((u) => u.role === "super_admin").length}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-red-600" />
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
                        placeholder="Rechercher par nom ou téléphone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filtrer par rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      <SelectItem value="customer">Clients</SelectItem>
                      <SelectItem value="admin">Administrateurs</SelectItem>
                      <SelectItem value="super_admin">Super Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-amber-600" />
                  Liste des utilisateurs ({filteredUsers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {(user.first_name || "U").charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.first_name} {user.last_name}
                                </p>
                                <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {user.phone && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {user.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select value={user.role} onValueChange={(newRole) => updateUserRole(user.id, newRole)}>
                              <SelectTrigger className="w-32">
                                <Badge className={getRoleBadgeColor(user.role)}>{getRoleLabel(user.role)}</Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="customer">Client</SelectItem>
                                <SelectItem value="admin">Administrateur</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(user.created_at).toLocaleDateString("fr-FR")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Modifier l'utilisateur</DialogTitle>
                                    <DialogDescription>
                                      Modifier les informations de l'utilisateur sélectionné
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedUser && (
                                    <UserEditForm
                                      user={selectedUser}
                                      onSave={(updates) => updateUserProfile(selectedUser.id, updates)}
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

interface UserEditFormProps {
  user: UserProfile
  onSave: (updates: Partial<UserProfile>) => void
  onCancel: () => void
}

function UserEditForm({ user, onSave, onCancel }: UserEditFormProps) {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone: user.phone || "",
    role: user.role || "customer",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      role: formData.role,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">Prénom</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="last_name">Nom</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="role">Rôle</Label>
        <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Client</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
        >
          Sauvegarder
        </Button>
      </div>
    </form>
  )
}