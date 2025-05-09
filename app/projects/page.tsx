"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Search, Filter, Github, ExternalLink, ArrowRight, Home, Sun, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

// Mock projects data (would be replaced with actual API calls)
const mockProjects = [
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
  {
    id: 5,
    slug: "blockchain-explorer",
    title: "Blockchain Explorer",
    description: "A web application to explore blockchain transactions and data.",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1632&auto=format&fit=crop",
    tags: ["React", "Web3.js", "Node.js", "Express"],
    category: "blockchain",
    link: "https://blockchain-explorer-demo.vercel.app",
    github: "https://github.com/johndoe/blockchain-explorer",
  },
  {
    id: 6,
    slug: "social-media-dashboard",
    title: "Social Media Dashboard",
    description: "A dashboard for managing and analyzing social media accounts.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1674&auto=format&fit=crop",
    tags: ["React", "Redux", "Firebase", "Material UI"],
    category: "frontend",
    link: "https://social-dashboard-demo.vercel.app",
    github: "https://github.com/johndoe/social-media-dashboard",
  },
  {
    id: 7,
    slug: "task-management-app",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1632&auto=format&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    link: "https://task-manager-demo.vercel.app",
    github: "https://github.com/johndoe/task-management-app",
  },
  {
    id: 8,
    slug: "recipe-finder",
    title: "Recipe Finder",
    description: "An app to discover recipes based on available ingredients.",
    image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1467&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "Spoonacular API"],
    category: "mobile",
    link: "https://recipe-finder-demo.vercel.app",
    github: "https://github.com/johndoe/recipe-finder",
  },
  {
    id: 9,
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "A responsive portfolio website built with modern web technologies.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1455&auto=format&fit=crop",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "frontend",
    link: "https://portfolio-demo.vercel.app",
    github: "https://github.com/johndoe/portfolio-website",
  },
]

// Categories for filtering
const categories = ["All", "Frontend", "Fullstack", "Mobile", "AI", "Blockchain"]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const { theme, setTheme } = useTheme()

  // Filter projects based on search query and category
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" || project.category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id
    } else if (sortBy === "oldest") {
      return a.id - b.id
    } else if (sortBy === "a-z") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "z-a") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="bg-background dark:bg-zinc-900 border-b border-border sticky top-0 z-10 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Code className="h-8 w-8 text-primary dark:text-blue-400" />
            </motion.div>
            <span className="font-bold text-xl">DevPortfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge className="bg-primary hover:bg-primary/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
              Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">My Work</h1>
            <p className="text-muted-foreground text-lg">
              Explore my portfolio of projects spanning web development, mobile apps, AI, and more.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("a-z")}>A-Z</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("z-a")}>Z-A</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Projects</h2>
            <p className="text-sm text-muted-foreground">
              {sortedProjects.length} {sortedProjects.length === 1 ? "project" : "projects"} found
            </p>
          </div>

          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSortBy("newest")
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted dark:bg-zinc-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Fixed ProjectCard component to avoid nested anchor tags
function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
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

