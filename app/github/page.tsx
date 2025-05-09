"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Star,
  GitFork,
  Code,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  LinkIcon,
  Twitter,
  Search,
  ArrowUpDown,
  ExternalLink,
  ChevronLeft,
  Moon,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

// Mock GitHub data (would be replaced with actual API calls)
const mockUserData = {
  login: "johndoe",
  name: "John Doe",
  avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop",
  bio: "Full-stack developer passionate about building beautiful and functional web applications.",
  company: "@awesome-company",
  location: "San Francisco, CA",
  blog: "https://johndoe.dev",
  twitter_username: "johndoe",
  public_repos: 42,
  followers: 256,
  following: 128,
  created_at: "2015-01-01T00:00:00Z",
  html_url: "https://github.com/johndoe",
}

const mockRepos = [
  {
    id: 1,
    name: "next-portfolio",
    description: "My personal portfolio website built with Next.js and Tailwind CSS",
    html_url: "https://github.com/johndoe/next-portfolio",
    homepage: "https://johndoe.dev",
    stargazers_count: 48,
    forks_count: 12,
    watchers_count: 5,
    language: "TypeScript",
    topics: ["next-js", "tailwindcss", "portfolio", "react"],
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-03-20T00:00:00Z",
    pushed_at: "2023-03-20T00:00:00Z",
    size: 1024,
    fork: false,
  },
  {
    id: 2,
    name: "ai-image-generator",
    description: "An AI-powered image generator using OpenAI's DALL-E API",
    html_url: "https://github.com/johndoe/ai-image-generator",
    homepage: "https://ai-image-gen.vercel.app",
    stargazers_count: 124,
    forks_count: 34,
    watchers_count: 15,
    language: "JavaScript",
    topics: ["ai", "openai", "image-generation", "react"],
    created_at: "2022-11-05T00:00:00Z",
    updated_at: "2023-02-10T00:00:00Z",
    pushed_at: "2023-02-10T00:00:00Z",
    size: 2048,
    fork: false,
  },
  {
    id: 3,
    name: "ecommerce-platform",
    description: "A full-stack e-commerce platform with Stripe payment integration",
    html_url: "https://github.com/johndoe/ecommerce-platform",
    homepage: "https://shop-demo.vercel.app",
    stargazers_count: 87,
    forks_count: 23,
    watchers_count: 9,
    language: "TypeScript",
    topics: ["ecommerce", "stripe", "next-js", "mongodb"],
    created_at: "2022-08-20T00:00:00Z",
    updated_at: "2023-01-05T00:00:00Z",
    pushed_at: "2023-01-05T00:00:00Z",
    size: 4096,
    fork: false,
  },
  {
    id: 4,
    name: "react-component-library",
    description: "A reusable React component library with Storybook documentation",
    html_url: "https://github.com/johndoe/react-component-library",
    homepage: "https://react-components.johndoe.dev",
    stargazers_count: 156,
    forks_count: 45,
    watchers_count: 12,
    language: "TypeScript",
    topics: ["react", "component-library", "storybook", "ui"],
    created_at: "2022-05-10T00:00:00Z",
    updated_at: "2023-02-28T00:00:00Z",
    pushed_at: "2023-02-28T00:00:00Z",
    size: 3072,
    fork: false,
  },
  {
    id: 5,
    name: "blockchain-explorer",
    description: "A web application to explore blockchain transactions and data",
    html_url: "https://github.com/johndoe/blockchain-explorer",
    homepage: "https://blockchain-explorer.vercel.app",
    stargazers_count: 92,
    forks_count: 18,
    watchers_count: 7,
    language: "JavaScript",
    topics: ["blockchain", "ethereum", "web3", "cryptocurrency"],
    created_at: "2022-03-15T00:00:00Z",
    updated_at: "2022-12-10T00:00:00Z",
    pushed_at: "2022-12-10T00:00:00Z",
    size: 2560,
    fork: false,
  },
  {
    id: 6,
    name: "fitness-tracker-app",
    description: "A mobile app for tracking workouts and fitness progress",
    html_url: "https://github.com/johndoe/fitness-tracker-app",
    homepage: "",
    stargazers_count: 64,
    forks_count: 14,
    watchers_count: 6,
    language: "JavaScript",
    topics: ["react-native", "fitness", "mobile-app", "health"],
    created_at: "2022-01-05T00:00:00Z",
    updated_at: "2022-11-20T00:00:00Z",
    pushed_at: "2022-11-20T00:00:00Z",
    size: 1536,
    fork: false,
  },
]

const mockLanguages = {
  TypeScript: 45,
  JavaScript: 30,
  HTML: 15,
  CSS: 10,
}

const mockStats = {
  totalStars: 571,
  totalForks: 146,
  totalWatchers: 54,
  totalCommits: 1248,
  contributionsLastYear: 842,
  streakDays: 32,
}

// Language colors for the badges
const languageColors = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
  "C#": "bg-indigo-500",
  PHP: "bg-pink-500",
  Ruby: "bg-rose-500",
  Go: "bg-cyan-500",
  Rust: "bg-amber-500",
  Swift: "bg-lime-500",
  Kotlin: "bg-fuchsia-500",
}

// Calculate time ago
const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
  }

  return "just now"
}

export default function GitHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("stars")
  const [filterLanguage, setFilterLanguage] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(mockUserData)
  const [repos, setRepos] = useState(mockRepos)
  const [stats, setStats] = useState(mockStats)
  const [languages, setLanguages] = useState(mockLanguages)
  const { theme, setTheme } = useTheme()

  // Simulate loading data from GitHub API
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort repositories
  const filteredRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesLanguage = filterLanguage === "all" || repo.language === filterLanguage

      return matchesSearch && matchesLanguage
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count
        case "forks":
          return b.forks_count - a.forks_count
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return b.stargazers_count - a.stargazers_count
      }
    })

  // Get unique languages from repos
  const uniqueLanguages = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
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
                <ChevronLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Profile */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-24 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              </CardHeader>
              <CardContent className="pt-0 relative">
                <div className="flex justify-center">
                  <div className="absolute -top-12 ring-4 ring-card rounded-full overflow-hidden">
                    {isLoading ? (
                      <Skeleton className="h-24 w-24 rounded-full" />
                    ) : (
                      <Image
                        src={userData.avatar_url || "/placeholder.svg"}
                        alt={userData.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-16 text-center space-y-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-7 w-40 mx-auto" />
                      <Skeleton className="h-5 w-32 mx-auto" />
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{userData.name}</h2>
                      <p className="text-muted-foreground">@{userData.login}</p>
                    </>
                  )}
                </div>

                <div className="mt-4">
                  {isLoading ? (
                    <Skeleton className="h-16 w-full" />
                  ) : (
                    <p className="text-center text-muted-foreground">{userData.bio}</p>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-2xl font-bold">{userData.public_repos}</p>
                        <p className="text-xs text-muted-foreground">Repositories</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{userData.followers}</p>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{userData.following}</p>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-full" />
                    </>
                  ) : (
                    <>
                      {userData.company && (
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.company}</span>
                        </div>
                      )}
                      {userData.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{userData.location}</span>
                        </div>
                      )}
                      {userData.blog && (
                        <div className="flex items-center gap-2 text-sm">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={userData.blog}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary dark:text-blue-400 hover:underline"
                          >
                            {userData.blog.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                      {userData.twitter_username && (
                        <div className="flex items-center gap-2 text-sm">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`https://twitter.com/${userData.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary dark:text-blue-400 hover:underline"
                          >
                            @{userData.twitter_username}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {formatDate(userData.created_at)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                    asChild
                  >
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View GitHub Profile
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">GitHub Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Total Stars</span>
                      </div>
                      <span className="font-semibold">{stats.totalStars}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <GitFork className="h-4 w-4 text-blue-500" />
                        <span>Total Forks</span>
                      </div>
                      <span className="font-semibold">{stats.totalForks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span>Total Commits</span>
                      </div>
                      <span className="font-semibold">{stats.totalCommits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        <span>Contributions (Year)</span>
                      </div>
                      <span className="font-semibold">{stats.contributionsLastYear}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        <span>Current Streak</span>
                      </div>
                      <span className="font-semibold">{stats.streakDays} days</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Languages Card */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Top Languages</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </>
                ) : (
                  <>
                    {Object.entries(languages).map(([language, percentage]) => (
                      <div key={language} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span>{language}</span>
                          <span className="text-sm text-muted-foreground">{percentage}%</span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2"
                          style={{
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Repositories */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold">Repositories</h2>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 border-primary/20 dark:border-blue-500/20"
                    >
                      {userData.public_repos} Public Repos
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search repositories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        {uniqueLanguages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex gap-2">
                          <ArrowUpDown className="h-4 w-4" />
                          Sort
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("stars")}>Most Stars</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("forks")}>Most Forks</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("updated")}>Recently Updated</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("created")}>Newest</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <Card key={i}>
                          <CardContent className="p-6">
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <div className="flex gap-2 mb-2">
                              <Skeleton className="h-5 w-16" />
                              <Skeleton className="h-5 w-16" />
                              <Skeleton className="h-5 w-16" />
                            </div>
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-24" />
                              <div className="flex gap-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                  ) : filteredRepos.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No repositories found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} timeAgo={timeAgo} />)
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contribution Graph */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Contribution Activity</h3>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-48 w-full" />
                ) : (
                  <div className="h-48 w-full bg-muted/50 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Calendar className="h-12 w-12 mx-auto text-primary dark:text-blue-400" />
                      <p className="text-muted-foreground">
                        {stats.contributionsLastYear} contributions in the last year
                      </p>
                      <Badge
                        variant="outline"
                        className="mx-auto bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                      >
                        {stats.streakDays} day streak
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-center text-sm text-muted-foreground">
                View full contribution graph on GitHub
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted dark:bg-zinc-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevPortfolio. GitHub data is refreshed periodically.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Repository Card Component
function RepoCard({ repo, timeAgo }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold hover:text-primary dark:hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <BookOpen className="h-4 w-4" />
                {repo.name}
              </Link>
              {repo.fork && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Forked
                </Badge>
              )}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {repo.description && <p className="text-muted-foreground mb-4">{repo.description}</p>}

          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics &&
              repo.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="bg-muted">
                  {topic}
                </Badge>
              ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-4">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <div className={`h-3 w-3 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`}></div>
                  <span className="text-sm">{repo.language}</span>
                </div>
              )}

              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{repo.stargazers_count}</span>
                </div>
              )}

              {repo.forks_count > 0 && (
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{repo.forks_count}</span>
                </div>
              )}
            </div>

            <div className="text-sm text-muted-foreground">Updated {timeAgo(repo.updated_at)}</div>
          </div>

          {repo.homepage && (
            <div className="mt-4 pt-4 border-t border-border">
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                {repo.homepage.replace(/^https?:\/\//, "")}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

