"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  CreditCard,
  Mail,
  Download,
  Share2,
  Phone,
  Star,
  Loader2,
  Check,
  X,
} from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

interface BookingDetails {
  bookingId: number;
  bookingStatus: string;
  activityDate: string;
  timeSlot: string;
  nbPersonnes: number;
  amountToPay: number;
  paymentStatus: string;
  activityId: number;
  activityName: string;
  activityType: string;
  pricePerPerson: number;
  duration: number;
  minPeople: number;
  maxPeople: number;
  ageRange: string;
  description: string;
  included: string[];
  images: string[];
}

interface PaymentResponse {
  payUrl: string;
  paymentRef: string;
}

interface PaymentStatusResponse {
  id: number;
  paymentRef: string;
  status: "completed" | "pending" | "failed" | "cancelled";
  amount: number; // This is in cents (24000 = 240.00 EUR)
  currency: string;
  orderId: string;
  createdAt: string;
}

interface SuccessStepProps {
  data?: ReservationData
}

export function SuccessStep({ data }: SuccessStepProps) {
  const router = useRouter();
  const [fetchedData, setFetchedData] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentRef, setPaymentRef] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "completed" | "failed" | "cancelled" | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      console.log('Booking ID:', data?.bookingId);
      if (!data?.bookingId) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/bookings/${data.bookingId}/full-details`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const details = await response.json();
        setFetchedData(details);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [data?.bookingId]);

  // Countdown timer effect
  useEffect(() => {
    if (!showPaymentModal || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showPaymentModal, timeLeft]);

  // Function to redirect to home page
  const redirectToHome = () => {
    setRedirecting(true);
    setTimeout(() => {
      router.push('/');
    }, 2000); // Redirect after 2 seconds to show success message
  };

  // Auto-check payment status when modal is open
  useEffect(() => {
    if (!showPaymentModal || !paymentRef) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/payments/webhook?payment_ref=${paymentRef}`);
        if (response.ok) {
          const statusData: PaymentStatusResponse = await response.json();
          setPaymentStatus(statusData.status);
          
          // Convert amount from cents to euros for display
          const amountInEuros = statusData.amount / 100;
          console.log(`Payment status: ${statusData.status}, Amount: ${amountInEuros}€`);
          
          if (statusData.status === "completed") {
            // Payment completed successfully - redirect to home
            setTimeout(() => {
              setShowPaymentModal(false);
              setPaymentStatus(null);
              setPaymentRef(null);
              setTimeLeft(900);
              redirectToHome();
            }, 3000);
          } else if (statusData.status === "failed" || statusData.status === "cancelled") {
            // Payment failed or cancelled
            setTimeout(() => {
              setShowPaymentModal(false);
              setPaymentStatus(null);
              setPaymentRef(null);
              setTimeLeft(900);
            }, 3000);
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Check status every 5 seconds
    const statusInterval = setInterval(checkPaymentStatus, 5000);
    
    // Auto-close after 15 minutes if still pending
    const timeout = setTimeout(() => {
      if (paymentStatus === "pending") {
        setPaymentStatus("failed");
        setTimeout(() => {
          setShowPaymentModal(false);
          setPaymentStatus(null);
          setPaymentRef(null);
          setTimeLeft(900);
        }, 3000);
      }
    }, 900000); // 15 minutes

    return () => {
      clearInterval(statusInterval);
      clearTimeout(timeout);
    };
  }, [showPaymentModal, paymentRef, paymentStatus]);

  const handleConfirmPayment = async () => {
    if (!data?.bookingId || !fetchedData) return;

    setProcessingPayment(true);
    try {
      // Convert amount to cents for the payment API
      const amountInCents = Math.round(finalPrice * 100);
      
      const paymentData = {
        amount: amountInCents, // Send amount in cents
        currency: "EUR",
        description: `Paiement pour ${fetchedData.activityName} - ${formatDate(fetchedData.activityDate)} ${fetchedData.timeSlot} - ${fetchedData.nbPersonnes} personne${fetchedData.nbPersonnes > 1 ? 's' : ''}`
      };

      console.log("Sending payment request:", paymentData);

      const response = await fetch(`http://localhost:8080/api/payments/init/${data.bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentResult: PaymentResponse = await response.json();
      console.log("Payment initiation response:", paymentResult);

      // Store payment reference and open payment modal
      setPaymentRef(paymentResult.paymentRef);
      setPaymentStatus("pending");
      setShowPaymentModal(true);
      
      // Open payment gateway in new window
      const paymentWindow = window.open(paymentResult.payUrl, 'payment', 'width=600,height=700');
      setPaymentWindow(paymentWindow);

    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Erreur lors du traitement du paiement. Veuillez réessayer.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleAlreadyPaid = async () => {
    if (!paymentRef) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/payments/webhook?payment_ref=${paymentRef}`);
      if (response.ok) {
        const statusData: PaymentStatusResponse = await response.json();
        setPaymentStatus(statusData.status);
        
        // Convert amount from cents to euros for display
        const amountInEuros = statusData.amount / 100;
        console.log(`Payment status: ${statusData.status}, Amount: ${amountInEuros}€`);

        // If payment is completed, redirect to home
        if (statusData.status === "completed") {
          setTimeout(() => {
            setShowPaymentModal(false);
            setPaymentStatus(null);
            setPaymentRef(null);
            setTimeLeft(900);
            redirectToHome();
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStatus(null);
    setPaymentRef(null);
    setTimeLeft(900);
    if (paymentWindow) {
      paymentWindow.close();
    }
  };

  const basePrice = fetchedData?.pricePerPerson || 120;
  const totalBasePrice = basePrice * (fetchedData?.nbPersonnes || data?.persons || 1);
  
  // Calculate discounts
  const promoDiscount = data?.discount || 0;
  const paymentDiscount = data?.paymentOption === "now" ? 0.1 : 0;
  const totalDiscount = paymentDiscount + promoDiscount;
  
  const discountAmount = totalBasePrice * totalDiscount;
  const finalPrice = fetchedData?.amountToPay || (totalBasePrice - discountAmount);
  
  // Payment amounts
  const amountToPayNow = data?.paymentOption === "now" ? finalPrice : 0;
  const amountToPayOnSite = data?.paymentOption === "spot" ? finalPrice : 0;

  const reservationNumber = data?.bookingId || `ADV-${Date.now().toString().slice(-6)}`;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Non sélectionnée";
    const date = new Date(dateStr);
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  };

  const formatTimeSlot = (timeSlot: string) => {
    return timeSlot;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if payment button should be enabled
  const isPaymentButtonEnabled = data?.bookingId && fetchedData && data.paymentOption === "now";

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Chargement des détails...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full mb-4 sm:mb-6">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
          Réservation Confirmée !
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Félicitations ! Votre aventure quad est réservée avec succès.
        </p>
      </motion.div>

      {/* Payment Confirmation Button */}
      {data?.paymentOption === "now" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Card className="backdrop-blur-sm bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Finaliser votre paiement
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Votre réservation est confirmée. Veuillez finaliser le paiement pour sécuriser votre créneau.
                {paymentDiscount > 0 && (
                  <span className="text-green-600 font-semibold ml-1">
                    Vous bénéficiez de {paymentDiscount * 100}% de réduction pour le paiement immédiat !
                  </span>
                )}
              </p>
              <Button
                onClick={handleConfirmPayment}
                disabled={!isPaymentButtonEnabled || processingPayment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-base sm:text-lg"
                size="lg"
              >
                {processingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Payer {amountToPayNow.toFixed(2)}€ maintenant
                  </>
                )}
              </Button>
              {!isPaymentButtonEnabled && !processingPayment && (
                <p className="text-sm text-amber-600 mt-2">
                  Chargement des détails du paiement...
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Payment Status Modal */}
      <Dialog open={showPaymentModal} onOpenChange={handleClosePaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {paymentStatus === "completed" ? (
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="w-8 h-8 mr-2" />
                  {redirecting ? "Redirection..." : "Paiement Réussi !"}
                </div>
              ) : paymentStatus === "failed" || paymentStatus === "cancelled" ? (
                <div className="flex items-center justify-center text-red-600">
                  <X className="w-8 h-8 mr-2" />
                  Paiement Échoué
                </div>
              ) : (
                <div className="flex items-center justify-center text-blue-600">
                  <Loader2 className="w-8 h-8 mr-2 animate-spin" />
                  Paiement en Cours
                </div>
              )}
            </DialogTitle>
            <DialogDescription className="text-center">
              {paymentStatus === "completed" 
                ? redirecting 
                  ? "Redirection vers la page d'accueil..."
                  : `Votre paiement de ${amountToPayNow.toFixed(2)}€ a été traité avec succès. Redirection vers la page d'accueil...`
                : paymentStatus === "failed" || paymentStatus === "cancelled"
                ? "Le paiement n'a pas pu être traité. Veuillez réessayer ou choisir une autre méthode de paiement."
                : `Veuillez compléter votre paiement de ${amountToPayNow.toFixed(2)}€ dans la fenêtre qui s'est ouverte.`}
            </DialogDescription>
          </DialogHeader>

          {paymentStatus === "pending" && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Temps restant: <span className="font-semibold">{formatTime(timeLeft)}</span>
                </p>
                <Progress value={(timeLeft / 900) * 100} className="w-full" />
                <p className="text-xs text-gray-500 mt-2">
                  La fenêtre de paiement se fermera automatiquement dans {formatTime(timeLeft)}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleAlreadyPaid}
                  variant="outline"
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  J'ai déjà payé
                </Button>
                <Button
                  onClick={handleClosePaymentModal}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {(paymentStatus === "completed" || paymentStatus === "failed" || paymentStatus === "cancelled") && !redirecting && (
            <DialogFooter>
              <Button 
                onClick={paymentStatus === "completed" ? redirectToHome : handleClosePaymentModal} 
                className="w-full"
              >
                {paymentStatus === "completed" ? "Retour à l'accueil" : "Réessayer"}
              </Button>
            </DialogFooter>
          )}

          {redirecting && (
            <div className="text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
              <p className="text-sm text-gray-600 mt-2">Redirection en cours...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reservation Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/95 border-green-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-600" />
              Détails de votre réservation
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <Badge className="bg-green-500 text-white text-sm sm:text-base px-3 py-1 self-start">
                Numéro: {reservationNumber}
              </Badge>
              <p className="text-sm sm:text-base text-gray-600">Confirmation envoyée à {data?.account?.email || "votre email"}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Adventure Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">{fetchedData?.activityName || "Aventure Quad en Tunisie"}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{fetchedData?.activityType || "Désert de Douz, Tunisie"}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">(4.9/5 - 127 avis)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Date</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">{formatDate(fetchedData?.activityDate)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Participants</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">
                      {fetchedData?.nbPersonnes || data?.persons || 1} personne{(fetchedData?.nbPersonnes || data?.persons || 1) > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Horaire</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">{formatTimeSlot(fetchedData?.timeSlot || data?.timeSlot || "Non sélectionné")}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900 flex items-center">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                Résumé du paiement
              </h3>

              <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">
                    Prix de base ({fetchedData?.nbPersonnes || data?.persons || 1} × {basePrice}€)
                  </span>
                  <span className="font-medium">{totalBasePrice}€</span>
                </div>

                {paymentDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base text-green-600">
                    <span>Réduction paiement immédiat (-{paymentDiscount * 100}%)</span>
                    <span className="font-medium">-{(totalBasePrice * paymentDiscount).toFixed(2)}€</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base text-green-600">
                    <span>
                      Code promo {data?.promoCode} (-{promoDiscount * 100}%)
                    </span>
                    <span className="font-medium">-{(totalBasePrice * promoDiscount).toFixed(2)}€</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{finalPrice.toFixed(2)}€</span>
                </div>

                {data?.paymentOption === "now" ? (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">À payer en ligne maintenant</span>
                        <span className="font-medium text-blue-600">{amountToPayNow.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">À payer sur place</span>
                        <span className="font-medium text-gray-600">0.00€</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">À payer sur place</span>
                        <span className="font-medium text-amber-600">{amountToPayOnSite.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">À payer en ligne</span>
                        <span className="font-medium text-gray-600">0.00€</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Important Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">Informations importantes</h3>
              <div className="bg-amber-50 border border-amber-200 p-3 sm:p-4 rounded-lg space-y-2">
                <p className="text-sm sm:text-base text-gray-700">{fetchedData?.description || "Aucune description disponible."}</p>
                {fetchedData?.included && fetchedData.included.length > 0 && (
                  <>
                    <h4 className="font-medium text-sm sm:text-base text-gray-900 mt-3">Inclus :</h4>
                    <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                      {fetchedData.included.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <Button className="bg-green-500 hover:bg-green-600 text-white h-12 sm:h-14 text-sm sm:text-base">
          <Download className="w-4 h-4 mr-2" />
          Télécharger PDF
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Mail className="w-4 h-4 mr-2" />
          Envoyer par email
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Share2 className="w-4 h-4 mr-2" />
          Partager
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Phone className="w-4 h-4 mr-2" />
          Nous contacter
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="backdrop-blur-sm bg-white/95 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl text-gray-900">Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-gray-900">Confirmation par email</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-gray-900">Rappel 24h avant</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    SMS et email de rappel avec les informations pratiques
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}