"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, Code, Home, User, Briefcase, Mail, FileText, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
  { name: "About", path: "/#about", icon: <User className="h-4 w-4 mr-2" /> },
  { name: "Projects", path: "/#projects", icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { name: "Blog", path: "/blog", icon: <FileText className="h-4 w-4 mr-2" /> },
  { name: "Contact", path: "/#contact", icon: <Mail className="h-4 w-4 mr-2" /> },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/"
    }

    if (path.startsWith("/#")) {
      // For hash links on homepage, check if we're on the homepage
      return pathname === "/"
    }

    // For other pages, check if the pathname starts with the path
    return pathname.startsWith(path)
  }

  // Update the handleNavigation function to better handle hash links

  // Handle navigation with custom scroll behavior
  const handleNavigation = (e, href) => {
    // For hash links on the current page
    if (href.includes("#")) {
      // If we're already on the homepage and the link is to a section on the homepage
      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault()

        // Extract the ID from the hash
        const id = href.replace("/#", "")
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
        return
      }

      // If the link is just a hash on the current page (like "#about")
      if (href.startsWith("#") && pathname === "/") {
        e.preventDefault()

        const id = href.replace("#", "")
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
        return
      }

      // If it's a hash link to another page, let Next.js handle it
      // Our updated useScrollRestoration hook will handle the hash correctly
    }

    // For navigation to a new page without hash, let Next.js handle it normally
    // Our ScrollRestoration component will handle scrolling to top
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Code className="h-8 w-8 text-primary dark:text-blue-400" />
            </motion.div>
            <span className="font-bold text-xl">DevPortfolio</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={(e) => handleNavigation(e, item.path)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                    isActive(item.path)
                      ? "text-primary dark:text-blue-400"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Link
                href="/blog"
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center text-foreground/80 hover:text-foreground hover:bg-muted"
              >
                <FileText className="h-4 w-4 mr-2" />
                Blog
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center text-foreground/80 hover:text-foreground hover:bg-muted"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </nav>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={(e) => handleNavigation(e, item.path)}
                      className={`px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center ${
                        isActive(item.path)
                          ? "text-primary dark:text-blue-400 bg-primary/10 dark:bg-blue-400/10"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center text-foreground hover:bg-muted"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Blog
                  </Link>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-md text-lg font-medium transition-colors flex items-center text-foreground hover:bg-muted"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

