import { z } from "zod"

export const searchFormSchema = z.object({
  location: z.string().min(1, "La destination est requise").max(100, "La destination est trop longue"),
  date: z
    .string()
    .min(1, "La date est requise")
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, "La date doit être dans le futur"),
  guests: z.string().min(1, "Le nombre de participants est requis"),
  searchQuery: z.string().max(200, "La recherche est trop longue").optional(),
})

export const bookingFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").max(50, "Le prénom est trop long"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(50, "Le nom est trop long"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .min(8, "Le numéro de téléphone doit contenir au moins 8 chiffres")
    .max(15, "Le numéro de téléphone est trop long"),
  specialRequests: z.string().max(500, "Les demandes spéciales sont trop longues").optional(),
  termsAccepted: z.boolean().refine((val) => val === true, "Vous devez accepter les conditions"),
})

export const filterSchema = z.object({
  priceRange: z.array(z.number()).length(2),
  difficulty: z.array(z.string()),
  features: z.array(z.string()),
  sortBy: z.enum(["recommended", "price-low", "price-high", "rating"]),
})

export type SearchFormData = z.infer<typeof searchFormSchema>
export type BookingFormData = z.infer<typeof bookingFormSchema>
export type FilterData = z.infer<typeof filterSchema>
