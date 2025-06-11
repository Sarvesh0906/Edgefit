"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

const BackToTop = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = (): void => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-brand-green hover:bg-green-700 text-white transition-all duration-300 z-50 shadow-lg hover:shadow-xl hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}

export default BackToTop
