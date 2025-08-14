"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Free Carthage Quad Adventure Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Get the latest adventure tips, exclusive offers, and insider guides delivered straight to your inbox.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6">
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="text-green-600 font-medium">
                  Thank you for subscribing! Check your email for confirmation.
                </div>
              )}

              <p className="text-sm text-gray-500 mt-3">No spam, unsubscribe at any time.</p>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src="/hero-sunset-quad.jpg" alt="Adventure Newsletter" fill className="object-cover" />
              <div className="absolute inset-0 bg-green-600/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
