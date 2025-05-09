"use client"

import { useScrollRestoration } from "@/hooks/use-scroll-restoration"

export function ScrollRestoration() {
  // This component doesn't render anything visible
  // It just uses the hook to handle scroll behavior
  useScrollRestoration()
  return null
}

