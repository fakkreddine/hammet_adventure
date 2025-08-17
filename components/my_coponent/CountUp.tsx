"use client"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface CountUpProps {
  from: number
  to: number
  duration: number
  separator?: string
  direction: "up" | "down"
  className?: string
  onStart?: () => void
  onEnd?: () => void
}

export default function CountUp({
  from,
  to,
  duration,
  separator = "",
  direction,
  className = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    onStart?.()

    const startTime = Date.now()
    const difference = to - from

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = from + difference * easeOutQuart

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(to)
        onEnd?.()
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, from, to, duration, onStart, onEnd])

  const formatNumber = (num: number) => {
    const rounded = Math.round(num * 100) / 100
    return separator ? rounded.toLocaleString() : rounded.toString()
  }

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  )
}
