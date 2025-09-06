import { motion } from "framer-motion"

import { Loader2 } from "lucide-react"
export default function Loading() {

  return (
       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Vérification...</h3>
            <p className="text-sm text-gray-600">Vérification de votre authentification</p>
          </div>
        </motion.div>
      </div>
  )
}
