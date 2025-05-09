"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Code,
  Search,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  ArrowRight,
  Home,
  Github,
  FileText,
  Moon,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

// Mock blog data (would be replaced with actual API calls)
const mockBlogPosts = [
  {
    id: 1,
    slug: "building-modern-web-apps-with-nextjs",
    title: "Building Modern Web Applications with Next.js",
    excerpt:
      "Learn how to leverage the power of Next.js to create fast, SEO-friendly web applications with server-side rendering and static site generation.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-11-15T10:30:00Z",
    readingTime: 8,
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Frontend"],
    featured: true,
    views: 1245,
    likes: 87,
  },
  {
    id: 2,
    slug: "mastering-typescript-for-react-developers",
    title: "Mastering TypeScript for React Developers",
    excerpt:
      "Discover how TypeScript can improve your React development workflow with static typing, better tooling, and enhanced code quality.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-10-28T14:15:00Z",
    readingTime: 10,
    category: "TypeScript",
    tags: ["TypeScript", "React", "JavaScript", "Frontend"],
    featured: true,
    views: 982,
    likes: 64,
  },
  {
    id: 3,
    slug: "state-management-in-react-2023",
    title: "State Management in React in 2023: Beyond Redux",
    excerpt:
      "Explore modern state management solutions for React applications in 2023, from Context API to Zustand, Jotai, and more.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-09-12T09:45:00Z",
    readingTime: 12,
    category: "React",
    tags: ["React", "State Management", "JavaScript", "Frontend"],
    featured: false,
    views: 1567,
    likes: 103,
  },
  {
    id: 4,
    slug: "tailwind-css-vs-styled-components",
    title: "Tailwind CSS vs. Styled Components: Choosing the Right Styling Approach",
    excerpt:
      "Compare two popular styling approaches for React applications: utility-first CSS with Tailwind and CSS-in-JS with Styled Components.",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-08-05T16:20:00Z",
    readingTime: 9,
    category: "CSS",
    tags: ["CSS", "Tailwind", "Styled Components", "Frontend"],
    featured: false,
    views: 876,
    likes: 52,
  },
  {
    id: 5,
    slug: "building-accessible-react-applications",
    title: "Building Accessible React Applications: A Comprehensive Guide",
    excerpt:
      "Learn how to create inclusive React applications that work for everyone, including people with disabilities.",
    coverImage: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-07-20T08:15:00Z",
    readingTime: 15,
    category: "Accessibility",
    tags: ["React", "Accessibility", "Frontend", "a11y"],
    featured: false,
    views: 723,
    likes: 91,
  },
  {
    id: 6,
    slug: "react-server-components-explained",
    title: "React Server Components Explained: The Future of React",
    excerpt: "Dive into React Server Components and understand how they change the way we build React applications.",
    coverImage: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-06-10T11:45:00Z",
    readingTime: 11,
    category: "React",
    tags: ["React", "Server Components", "JavaScript", "Frontend"],
    featured: false,
    views: 1089,
    likes: 76,
  },
]

// Categories for filtering
const categories = ["All", "Web Development", "React", "TypeScript", "CSS", "Accessibility"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const { theme, setTheme } = useTheme()

  // Filter posts based on search query and category
  const filteredPosts = mockBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    } else if (sortBy === "views") {
      return b.views - a.views
    } else if (sortBy === "likes") {
      return b.likes - a.likes
    }
    return 0
  })

  // Featured posts
  const featuredPosts = mockBlogPosts.filter((post) => post.featured)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

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
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Insights & Tutorials</h1>
            <p className="text-muted-foreground text-lg">
              Explore articles on web development, React, TypeScript, and more. Stay updated with the latest trends and
              best practices.
            </p>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary hover:bg-primary/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                          Featured
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge
                        variant="outline"
                        className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readingTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
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
                  <DropdownMenuItem onClick={() => setSortBy("date")}>Latest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("views")}>Most viewed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("likes")}>Most liked</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Articles</h2>
            <p className="text-sm text-muted-foreground">
              {sortedPosts.length} {sortedPosts.length === 1 ? "article" : "articles"} found
            </p>
          </div>

          {sortedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge
                        variant="outline"
                        className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                      >
                        {post.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime} min read</span>
                      </div>
                      <Button variant="outline" className="w-full gap-2" size="sm">
                        Read article
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSortBy("date")
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
            &copy; {new Date().getFullYear()} DevPortfolio. All articles are written by John Doe.
          </p>
        </div>
      </footer>
    </div>
  )
}

