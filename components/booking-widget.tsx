"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, ArrowRight } from "lucide-react"

const adventures = [
  { id: 1, name: "Sunset Safari", price: "45€", duration: "2h" },
  { id: 2, name: "Night Adventure", price: "55€", duration: "3h" },
  { id: 3, name: "Group Experience", price: "40€", duration: "2.5h" },
]

export function BookingWidget() {
  const [step, setStep] = useState(1)
  const [selectedAdventure, setSelectedAdventure] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [groupSize, setGroupSize] = useState(2)

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= stepNum ? "bg-brand-green text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div
                className={`w-12 h-1 mx-2 transition-all duration-300 ${
                  step > stepNum ? "bg-brand-green" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Choose Adventure */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Adventure</h3>
          {adventures.map((adventure) => (
            <button
              key={adventure.id}
              onClick={() => {
                setSelectedAdventure(adventure)
                nextStep()
              }}
              className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-brand-green hover:bg-green-50 transition-all duration-300 text-left group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-brand-green">{adventure.name}</div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {adventure.duration}
                  </div>
                </div>
                <div className="text-xl font-bold text-brand-green">{adventure.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Customize */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Customize Your Experience</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
            >
              <option value="">Choose time</option>
              <option value="09:00">09:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Group Size
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
              >
                -
              </button>
              <span className="text-xl font-bold w-8 text-center">{groupSize}</span>
              <button
                onClick={() => setGroupSize(groupSize + 1)}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          <Button
            onClick={nextStep}
            disabled={!selectedDate || !selectedTime}
            className="w-full adventure-btn bg-gradient-to-r from-brand-green to-brand-green-light text-white font-bold py-3 rounded-lg"
          >
            Continue to Confirmation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Your Booking</h3>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Adventure:</span>
              <span>{selectedAdventure?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Time:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Group Size:</span>
              <span>{groupSize} people</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-brand-green">{Number.parseInt(selectedAdventure?.price) * groupSize}€</span>
            </div>
          </div>

          <Button className="w-full adventure-btn bg-gradient-to-r from-brand-green to-brand-green-light text-white font-bold py-4 rounded-lg text-lg animate-pulse-glow">
            Secure Payment
          </Button>

          <div className="text-center text-xs text-gray-500">
            🔒 Secure payment • Instant confirmation • Free cancellation
          </div>
        </div>
      )}
    </div>
  )
}
