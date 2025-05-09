"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// This hook handles scroll behavior during navigation:
// 1. Scrolls to top when navigating to a new page
// 2. Restores scroll position when navigating back
export function useScrollRestoration() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Store scroll positions keyed by pathname + search
  useEffect(() => {
    if (typeof window === "undefined") return

    // Create a unique key for the current URL (without the hash part)
    const urlWithoutHash = pathname + searchParams.toString()

    // Save the current scroll position before navigating away
    const handleBeforeUnload = () => {
      sessionStorage.setItem(
        `scrollPosition-${urlWithoutHash}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY }),
      )
    }

    // Restore scroll position if returning to this page
    const restoreScrollPosition = () => {
      const scrollData = sessionStorage.getItem(`scrollPosition-${urlWithoutHash}`)
      if (scrollData) {
        try {
          const { x, y } = JSON.parse(scrollData)
          // Use a small timeout to ensure the DOM is fully loaded
          setTimeout(() => window.scrollTo(x, y), 0)
        } catch (e) {
          console.error("Failed to restore scroll position:", e)
        }
      } else {
        // If no saved position and no hash in URL, scroll to top
        if (!window.location.hash) {
          window.scrollTo(0, 0)
        }
      }
    }

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Check if this is a back/forward navigation
    if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
      // This is a back/forward navigation, restore position
      restoreScrollPosition()
    } else {
      // This is a new navigation
      // Only scroll to top if there's no hash in the URL and it's a new page
      if (!window.location.hash) {
        window.scrollTo(0, 0)
      }
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [pathname, searchParams])

  return null
}

