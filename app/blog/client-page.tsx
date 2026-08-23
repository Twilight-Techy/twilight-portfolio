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
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

// Categories for filtering
const categories = ["All", "Web Development", "React", "TypeScript", "CSS", "Accessibility"]

export default function BlogPage({ allPosts }: { allPosts: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date")
  const { theme, setTheme } = useTheme()

  // Filter posts based on search query and category
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.meta.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || post.meta.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
    } else if (sortBy === "views") {
      return b.meta.views - a.meta.views
    } else if (sortBy === "likes") {
      return b.meta.likes - a.meta.likes
    }
    return 0
  })

  // Featured posts
  const featuredPosts = allPosts.filter((post) => post.meta.featured)

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
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100">
<Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
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
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.meta.coverImage || "/placeholder.svg"}
                        alt={post.meta.title}
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
                        {post.meta.category}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{post.meta.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.meta.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.meta.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.meta.readingTime} min read</span>
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
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.meta.coverImage || "/placeholder.svg"}
                        alt={post.meta.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge
                        variant="outline"
                        className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                      >
                        {post.meta.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2">{post.meta.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{post.meta.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.meta.publishedAt)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3" />
                        <span>{post.meta.readingTime} min read</span>
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

<Footer />
    </div>
  )
}

