import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Shield, CreditCard } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-serif font-bold mb-4">Restez Connecté à l'Aventure</h3>
          <p className="text-xl mb-8 text-white/90">
            Recevez nos offres exclusives et conseils d'experts pour vos prochaines aventures à Hammamet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
            <Button className="bg-white text-green-600 hover:bg-white/90 font-semibold px-8">S'abonner</Button>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6 text-green-400">Carthage Quad Hammamet</h2>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Votre partenaire de confiance pour des aventures inoubliables à Hammamet. Quad, catamaran, dromadaire -
                Vivez l'expérience tunisienne authentique avec notre équipe d'experts locaux.
              </p>

              {/* Social Media */}
              <div className="flex space-x-4 mb-6">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-green-400 hover:border-green-400 bg-transparent"
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-green-400 hover:border-green-400 bg-transparent"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-blue-400 hover:border-blue-400 bg-transparent"
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>

              {/* Payment Security */}
              <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6 text-green-400" />
                <span className="text-sm text-gray-300">Paiement 100% Sécurisé</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                  <div className="w-8 h-5 bg-green-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-6 text-white">Liens Rapides</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#activities" className="text-gray-300 hover:text-green-400 transition-colors">
                    Nos Activités
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-gray-300 hover:text-green-400 transition-colors">
                    Réservation
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-300 hover:text-green-400 transition-colors">
                    Blog & Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-6 text-white">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Zone Touristique Yasmine</p>
                    <p className="text-gray-300">8050 Hammamet, Tunisie</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">+216 72 123 456</p>
                    <p className="text-gray-300">+216 98 765 432</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-gray-300">info@carthage-quad.tn</p>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold text-white mb-2">Horaires d'ouverture</h5>
                <p className="text-sm text-gray-300">Lun - Dim: 8h00 - 20h00</p>
                <p className="text-sm text-gray-300">Support 24h/7j via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Carthage Quad Hammamet. Tous droits réservés.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Licence Tourisme: TN-2024-001</span>
              <span>Assurance Responsabilité Civile</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
