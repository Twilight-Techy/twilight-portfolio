"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Code,
  Calendar,
  Clock,
  ChevronLeft,
  Bookmark,
  Heart,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"

import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export default function BlogPostPage({ post, relatedPosts }: { post: any, relatedPosts: any[] }) {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  
  const [isLoading, setIsLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.meta?.likes || 0)
  const [copied, setCopied] = useState(false)


  // Handle like button click
  const handleLike = () => {
    setLiked(!liked)
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  // Handle share button click
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Custom renderer components for ReactMarkdown
  const components = {
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="mb-4 ml-6 list-disc" {...props} />,
    ol: ({ node, ...props }) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="text-primary dark:text-blue-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-primary dark:border-blue-400 pl-4 italic my-4" {...props} />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "")
      return !inline && match ? (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" className="rounded-md my-4" {...props}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="bg-background dark:bg-zinc-900 border-b border-border sticky top-0 z-10 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <Code className="h-8 w-8 text-primary dark:text-blue-400" />
            </motion.div>
            <span className="font-bold text-xl">Twilight Techy</span>
          </Link>

          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Blog</span></Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {isLoading ? (
          <BlogPostSkeleton />
        ) : post ? (
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 border-primary/20 dark:border-blue-500/20"
                >
                  {post.meta.category}
                </Badge>
                {post.featured && <Badge className="bg-primary/90 hover:bg-primary text-white">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.meta.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/profile.png" alt="Ibrahim A. Makanjuola" />
                    <AvatarFallback>IM</AvatarFallback>
                  </Avatar>
                  <span>Ibrahim A. Makanjuola</span>
                </div>

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
                  <span>{post.meta.views} views</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.meta.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8 rounded-lg overflow-hidden">
              <Image src={post.meta.coverImage || "/placeholder.svg"} alt={post.meta.title} fill className="object-cover" />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
            </div>

            {/* Article Footer */}
            <div className="border-t border-border pt-8 mb-12">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-2 ${liked ? "text-red-500 dark:text-red-400" : ""}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-red-500 dark:fill-red-400" : ""}`} />
                    {likesCount}
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2" onClick={handleCopyLink}>
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copied ? "Copied!" : "Copy link"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy article link to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Share:</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share on Twitter</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Facebook className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share on Facebook</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share on LinkedIn</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-muted dark:bg-zinc-800 rounded-lg p-6 mb-12">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/images/profile.png" alt="Ibrahim A. Makanjuola" />
                  <AvatarFallback>IM</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-xl font-bold mb-2">Ibrahim A. Makanjuola</h3>
                  <p className="text-muted-foreground mb-4">
                    Software engineer building AI systems: LLM inference infrastructure, tool-calling agents,
                    and models small enough to run on a microcontroller. Currently on the backend of
                    Games4Africa, and building Skyla.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/Twilight-Techy" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://www.linkedin.com/in/ibrahim-makanjuola"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={relatedPost.meta.coverImage || "/placeholder.svg"}
                            alt={relatedPost.meta.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge
                            variant="outline"
                            className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                          >
                            {relatedPost.meta.category}
                          </Badge>
                          <h3 className="font-bold text-lg mb-2">{relatedPost.meta.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{relatedPost.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(relatedPost.meta.publishedAt)}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.meta.readingTime} min read</span>
                          </div>
                        </CardContent>{" "}
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <Button variant="outline" className="gap-2" asChild>
                <Link href="/">
                  <ArrowRight className="h-4 w-4" />
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Article not found</h3>
            <p className="text-muted-foreground mb-4">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="outline" asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        )}
      </main>

<Footer />
    </div>
  )
}

// Blog Post Skeleton Component
function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-10 w-3/4 mb-4" />

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />

      {/* Content Skeleton */}
      <div className="space-y-4 mb-12">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-2/3 mt-8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Footer Skeleton */}
      <div className="border-t border-border pt-8 mb-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Author Bio Skeleton */}
      <Skeleton className="h-48 w-full rounded-lg mb-12" />

      {/* Related Articles Skeleton */}
      <div className="mb-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full rounded-lg" />
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

