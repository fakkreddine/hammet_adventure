"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {Header} from "@/components/header"
import { Footer } from "@/components/footer"
import { ProtectedRoute } from "@/components/auth/protected-route"

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", data)
    toast.success("Message envoyé avec succès! Nous vous répondrons bientôt.")
    reset()
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Avenue Habib Bourguiba, Hammamet 8050, Tunisie",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+216 72 280 123",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@carthagequad.tn",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Dim: 8h00 - 18h00",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600", bgColor: "hover:bg-blue-50" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600", bgColor: "hover:bg-pink-50" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400", bgColor: "hover:bg-blue-50" },
  ]

  return (
    <>
    <ProtectedRoute>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <section className="relative py-24 px-4 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge
              variant="secondary"
              className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium"
            >
              Contact
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">Contactez-nous</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Prêt pour votre prochaine aventure en quad? Nous sommes là pour répondre à toutes vos questions et vous
              aider à planifier l'expérience parfaite.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-2xl border-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 pb-8 pt-8">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Envoyez-nous un message</CardTitle>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="name" className="text-sm font-semibold text-gray-800 block">
                            Nom complet *
                          </label>
                          <Input
                            id="name"
                            {...register("name")}
                            placeholder="Votre nom"
                            className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                            aria-invalid={errors.name ? "true" : "false"}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-600 mt-2" role="alert">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="email" className="text-sm font-semibold text-gray-800 block">
                            Email *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="votre@email.com"
                            className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                            aria-invalid={errors.email ? "true" : "false"}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-600 mt-2" role="alert">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="subject" className="text-sm font-semibold text-gray-800 block">
                          Sujet *
                        </label>
                        <Input
                          id="subject"
                          {...register("subject")}
                          placeholder="Sujet de votre message"
                          className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500 text-base"
                          aria-invalid={errors.subject ? "true" : "false"}
                        />
                        {errors.subject && (
                          <p className="text-sm text-red-600 mt-2" role="alert">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="message" className="text-sm font-semibold text-gray-800 block">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          {...register("message")}
                          placeholder="Décrivez votre demande en détail..."
                          rows={6}
                          className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 resize-none text-base"
                          aria-invalid={errors.message ? "true" : "false"}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-600 mt-2" role="alert">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 text-base h-14"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-8">
              {/* Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-4 rounded-xl ${info.bgColor} ${info.color} flex-shrink-0`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-2 text-lg">{info.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{info.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-6 text-lg">Suivez-nous</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className={`p-4 rounded-xl bg-gray-50 text-gray-600 ${social.color} ${social.bgColor} transition-all duration-200 hover:scale-110 hover:shadow-md`}
                          aria-label={social.label}
                        >
                          <social.icon className="h-6 w-6" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre localisation</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Venez nous rendre visite dans notre centre à Hammamet pour découvrir nos quads et planifier votre
                aventure.
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-white overflow-hidden max-w-4xl mx-auto">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.8234567890123!2d10.6167!3d36.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDI0JzAwLjAiTiAxMMKwMzcnMDAuMCJF!5e0!3m2!1sen!2stn!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carthage Quad Location"
                    className="absolute inset-0"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
    </ProtectedRoute>
    </>
  )
}
