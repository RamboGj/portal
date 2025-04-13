"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressBarProps {
  color?: string
  height?: number
  className?: string
}

export function ScrollProgressBar({
  height = 5,
  className,
}: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far the user has scrolled through the content
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      const scrollPercentRounded = Math.min(100, Math.round(scrollPercent * 100))
      
      setScrollProgress(scrollPercentRounded)
    }

    // Add scroll event listener with requestAnimationFrame for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)
    
    // Initial calculation
    updateScrollProgress()

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-opacity duration-300",
        scrollProgress > 0 ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className={cn("h-full bg-blue-600 rounded-xl transition-transform  ease-in duration-1000")}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}
