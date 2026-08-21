"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  Moon,
  Sun,
  Code,
  Briefcase,
  User,
  Home,
  FileText,
  Layers,
  FileCode,
  Paintbrush,
  Server,
  Zap,
  Database,
  Download,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { useTheme } from "@/components/theme-provider"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle scroll events to update active section and scroll position
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine which section is currently in view
      const sections = ["home", "about", "projects", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Consider a section active when its top part is near the viewport top
          // This gives a better indication of which section the user is viewing
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Call once on mount to set initial active section
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Project data
  const projects = [
    {
      id: 1,
      slug: "e-commerce-platform",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with payment integration and admin dashboard.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      link: "https://ecommerce-demo.vercel.app",
      github: "https://github.com/johndoe/ecommerce-platform",
    },
    {
      id: 2,
      slug: "ai-image-generator",
      title: "AI Image Generator",
      description: "Web app that generates images based on text prompts using AI models.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop",
      tags: ["Next.js", "OpenAI", "TailwindCSS", "TypeScript"],
      category: "ai",
      link: "https://ai-image-generator-demo.vercel.app",
      github: "https://github.com/johndoe/ai-image-generator",
    },
    {
      id: 3,
      slug: "fitness-tracker",
      title: "Fitness Tracker",
      description: "Mobile app for tracking workouts, nutrition, and fitness progress.",
      image: "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?q=80&w=1470&auto=format&fit=crop",
      tags: ["React Native", "Firebase", "Redux", "Expo"],
      category: "mobile",
      link: "https://fitness-tracker-demo.vercel.app",
      github: "https://github.com/johndoe/fitness-tracker",
    },
    {
      id: 4,
      slug: "weather-dashboard",
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with forecasts and historical data.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1470&auto=format&fit=crop",
      tags: ["Vue.js", "WeatherAPI", "Chart.js", "SCSS"],
      category: "frontend",
      link: "https://weather-dashboard-demo.vercel.app",
      github: "https://github.com/johndoe/weather-dashboard",
    },
  ]

  // Filter projects
  const [activeFilter, setActiveFilter] = useState("all")
  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100 overflow-x-hidden">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 || isMenuOpen ? "bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Code className="h-8 w-8 text-primary dark:text-blue-400" />
            </motion.div>
            <span className="font-bold text-xl">DevPortfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#home" isActive={activeSection === "home"} icon={<Home className="h-4 w-4" />}>
              Home
            </NavLink>
            <NavLink href="#about" isActive={activeSection === "about"} icon={<User className="h-4 w-4" />}>
              About
            </NavLink>
            <NavLink href="#projects" isActive={activeSection === "projects"} icon={<Briefcase className="h-4 w-4" />}>
              Projects
            </NavLink>
            <NavLink href="#contact" isActive={activeSection === "contact"} icon={<Mail className="h-4 w-4" />}>
              Contact
            </NavLink>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <FileText className="h-4 w-4" />
              Blog
            </Link>
            <Link
              href="/github"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {mounted ? (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <Sun className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {mounted ? (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />) : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border bg-transparent"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <MobileNavLink href="#home" onClick={() => setIsMenuOpen(false)} icon={<Home className="h-4 w-4" />}>
                Home
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)} icon={<User className="h-4 w-4" />}>
                About
              </MobileNavLink>
              <MobileNavLink
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                icon={<Briefcase className="h-4 w-4" />}
              >
                Projects
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)} icon={<Mail className="h-4 w-4" />}>
                Contact
              </MobileNavLink>
              <Link
                href="/blog"
                className="py-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4" />
                Blog
              </Link>
              <Link
                href="/github"
                className="py-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="min-h-[100dvh] flex items-center pt-20 md:pt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-3 md:space-y-6"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-1 text-sm bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 border-primary/20 dark:border-blue-500/20"
                >
                  Full-Stack Developer
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Crafting Digital <span className="text-primary dark:text-blue-400">Experiences</span> That Matter
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  I build modern, responsive web applications with cutting-edge technologies to solve real-world
                  problems.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />View My Work</Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />Contact Me</Button>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" asChild>
                    <a href="mailto:hello@example.com">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent dark:from-blue-600/20 rounded-lg z-10"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop"
                    alt="Developer working on code"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-primary/10 dark:bg-blue-600/10 rounded-lg z-0"></div>
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-primary/10 dark:bg-blue-600/10 rounded-lg z-0"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader title="About Me" subtitle="My Background & Skills" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden border-4 border-background dark:border-zinc-800 shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop"
                    alt="Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 dark:bg-blue-600/10 rounded-lg -z-10"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">
                  Hi, I'm <span className="text-primary dark:text-blue-400">John Doe</span>
                </h3>
                <p className="text-muted-foreground">
                  I'm a passionate full-stack developer with over 5 years of experience building web applications. I
                  specialize in JavaScript technologies across the stack and have a strong foundation in modern
                  frameworks.
                </p>
                <p className="text-muted-foreground">
                  My journey in tech started when I built my first website at 15. Since then, I've worked with startups
                  and established companies to create scalable, user-friendly applications that solve real problems.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Frontend</h4>
                    <ul className="space-y-2">
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Code className="h-3 w-3" />
                          React
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Layers className="h-3 w-3" />
                          Next.js
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <FileCode className="h-3 w-3" />
                          TypeScript
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Paintbrush className="h-3 w-3" />
                          Tailwind CSS
                        </Badge>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Backend</h4>
                    <ul className="space-y-2">
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Server className="h-3 w-3" />
                          Node.js
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Zap className="h-3 w-3" />
                          Express
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Database className="h-3 w-3" />
                          MongoDB
                        </Badge>
                      </li>
                      <li>
                        <Badge className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30 flex items-center w-fit gap-1.5">
                          <Database className="h-3 w-3" />
                          PostgreSQL
                        </Badge>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700" asChild>
                    <a
                      href="https://drive.google.com/file/d/1example-resume-link/view"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />Download Resume</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/50 dark:bg-zinc-800/50">
          <div className="container mx-auto px-4">
            <SectionHeader title="My Projects" subtitle="Recent Work" />

            <div className="mt-8">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-center mb-8 md:mb-12">
                  <TabsList className="flex flex-wrap justify-center gap-2 md:gap-4 h-auto w-full bg-transparent p-0">
                    <TabsTrigger
                      value="all"
                      onClick={() => setActiveFilter("all")}
                      className="rounded-full px-5 py-2 md:px-6 md:py-2.5 border border-border/50 bg-background/50 backdrop-blur-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:border-blue-600 hover:bg-muted/80 hover:border-border transition-all shadow-sm"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="frontend"
                      onClick={() => setActiveFilter("frontend")}
                      className="rounded-full px-5 py-2 md:px-6 md:py-2.5 border border-border/50 bg-background/50 backdrop-blur-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:border-blue-600 hover:bg-muted/80 hover:border-border transition-all shadow-sm"
                    >
                      Frontend
                    </TabsTrigger>
                    <TabsTrigger
                      value="fullstack"
                      onClick={() => setActiveFilter("fullstack")}
                      className="rounded-full px-5 py-2 md:px-6 md:py-2.5 border border-border/50 bg-background/50 backdrop-blur-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:border-blue-600 hover:bg-muted/80 hover:border-border transition-all shadow-sm"
                    >
                      Full Stack
                    </TabsTrigger>
                    <TabsTrigger
                      value="mobile"
                      onClick={() => setActiveFilter("mobile")}
                      className="rounded-full px-5 py-2 md:px-6 md:py-2.5 border border-border/50 bg-background/50 backdrop-blur-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:border-blue-600 hover:bg-muted/80 hover:border-border transition-all shadow-sm"
                    >
                      Mobile
                    </TabsTrigger>
                    <TabsTrigger
                      value="ai"
                      onClick={() => setActiveFilter("ai")}
                      className="rounded-full px-5 py-2 md:px-6 md:py-2.5 border border-border/50 bg-background/50 backdrop-blur-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:border-blue-600 hover:bg-muted/80 hover:border-border transition-all shadow-sm"
                    >
                      AI
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="frontend" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="fullstack" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/projects">
                <Button variant="outline" size="lg" className="group">
                  View All Projects
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader title="Get In Touch" subtitle="Contact Me" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold">Let's Talk About Your Project</h3>
                <p className="text-muted-foreground">
                  Have a project in mind or just want to say hello? Feel free to reach out. I'm always open to
                  discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-blue-600/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-muted-foreground">hello@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-blue-600/10 p-3 rounded-full">
                      <Linkedin className="h-6 w-6 text-primary dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">LinkedIn</h4>
                      <p className="text-muted-foreground">linkedin.com/in/johndoe</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-blue-600/10 p-3 rounded-full">
                      <Github className="h-6 w-6 text-primary dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">GitHub</h4>
                      <p className="text-muted-foreground">github.com/johndoe</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

<Footer />
    </div>
  )
}

// Update the NavLink component to properly handle hash links
function NavLink({ href, isActive, children, icon }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-1.5 transition-colors ${isActive ? "text-primary dark:text-blue-400 font-medium" : "text-muted-foreground hover:text-foreground"}`}
      onClick={(e) => {
        // For hash links, handle scrolling manually
        if (href.startsWith("#")) {
          e.preventDefault()
          const id = href.substring(1)
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }}
    >
      {icon}
      {children}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 h-1 w-12 bg-primary dark:bg-blue-400 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
}

// Component for mobile navigation links
function MobileNavLink({ href, onClick, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
      onClick={(e) => {
        // Close the mobile menu
        onClick()

        // For hash links, handle scrolling manually
        if (href.startsWith("#")) {
          e.preventDefault()
          const element = document.getElementById(href.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }}
      scroll={!href.startsWith("#")} // Don't use Next.js scroll for hash links
    >
      {icon}
      {children}
    </Link>
  )
}

// Component for section headers
function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center space-y-2 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
      <div className="w-24 h-1 bg-primary dark:bg-blue-500 mx-auto mt-4 rounded-full"></div>
    </div>
  )
}

// Component for project cards
function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden h-full border border-border hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent dark:from-zinc-900/80"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <h3 className="font-bold text-lg text-white drop-shadow-md">{project.title}</h3>
            <div className="flex gap-2">
              {project.github && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.github, "_blank", "noopener,noreferrer")
                  }}
                >
                  <Github className="h-4 w-4" />
                </Button>
              )}
              {project.link && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.link, "_blank", "noopener,noreferrer")
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
<CardContent className="p-4">
          <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-muted">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/projects/${project.slug}`}>
            <Button variant="outline" className="w-full gap-2" size="sm">
              View details
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

