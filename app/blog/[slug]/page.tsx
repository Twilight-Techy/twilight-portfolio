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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock blog data (would be replaced with actual API calls)
const mockBlogPosts = [
  {
    id: 1,
    slug: "building-modern-web-apps-with-nextjs",
    title: "Building Modern Web Applications with Next.js",
    excerpt:
      "Learn how to leverage the power of Next.js to create fast, SEO-friendly web applications with server-side rendering and static site generation.",
    content:
      "# Building Modern Web Applications with Next.js\n\nNext.js has revolutionized the way we build React applications. With its powerful features like server-side rendering, static site generation, and API routes, it provides a comprehensive framework for building modern web applications.\n\n## Why Next.js?\n\nNext.js solves many common problems in React development:\n\n- **Performance**: Automatic code splitting, optimized images, and static generation\n- **SEO**: Server-side rendering ensures your content is indexable by search engines\n- **Developer Experience**: Hot reloading, file-based routing, and built-in TypeScript support\n\n## Getting Started\n\nTo create a new Next.js app, you can use the create-next-app command:\n\n```bash\nnpx create-next-app my-next-app\n```\n\nThis sets up a new Next.js project with all the necessary configuration.\n\n## Key Features\n\n### File-based Routing\n\nNext.js uses a file-based routing system. Simply create a file in the `pages` directory, and it automatically becomes a route.\n\n### Server-side Rendering\n\nNext.js allows you to pre-render pages at request time with `getServerSideProps`:\n\n```jsx\nexport async function getServerSideProps(context) {\n  const data = await fetchData();\n  return {\n    props: { data },\n  };\n}\n```\n\n### Static Site Generation\n\nFor pages that can be pre-rendered at build time, use `getStaticProps`:\n\n```jsx\nexport async function getStaticProps() {\n  const data = await fetchData();\n  return {\n    props: { data },\n    revalidate: 60, // Optional: revalidate every 60 seconds\n  };\n}\n```\n\n## Conclusion\n\nNext.js provides a powerful framework for building modern web applications. Its combination of performance optimization, developer experience, and flexibility makes it an excellent choice for projects of all sizes.\n\nIn future articles, we'll explore more advanced features of Next.js, including API routes, middleware, and deployment strategies.",
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
    content:
      "# Mastering TypeScript for React Developers\n\nTypeScript has become an essential tool for React developers, providing static typing, better tooling, and enhanced code quality. In this article, we'll explore how to effectively use TypeScript with React.\n\n## Why TypeScript with React?\n\nCombining TypeScript with React offers several benefits:\n\n- **Type Safety**: Catch errors at compile time rather than runtime\n- **Better Developer Experience**: Improved autocomplete and IntelliSense\n- **Self-Documenting Code**: Types serve as documentation\n- **Safer Refactoring**: TypeScript helps ensure refactors don't break existing code\n\n## Setting Up TypeScript with React\n\nCreate a new React project with TypeScript:\n\n```bash\nnpx create-react-app my-app --template typescript\n```\n\nOr for Next.js:\n\n```bash\nnpx create-next-app --typescript\n```\n\n## Typing React Components\n\n### Function Components\n\n```tsx\ntype GreetingProps = {\n  name: string;\n  age?: number; // Optional prop\n};\n\nconst Greeting: React.FC<GreetingProps> = ({ name, age }) => {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      {age && <p>You are {age} years old.</p>}\n    </div>\n  );\n};\n```\n\n### Typing Hooks\n\n```tsx\nconst [count, setCount] = useState<number>(0);\n\nconst [user, setUser] = useState<User | null>(null);\n```\n\n### Event Handlers\n\n```tsx\nconst handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {\n  setName(event.target.value);\n};\n\nconst handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {\n  event.preventDefault();\n  // Submit form\n};\n```\n\n## Advanced TypeScript Patterns\n\n### Generic Components\n\n```tsx\ntype ListProps<T> = {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n};\n\nfunction List<T>({ items, renderItem }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map((item, index) => (\n        <li key={index}>{renderItem(item)}</li>\n      ))}\n    </ul>\n  );\n}\n```\n\n### Discriminated Unions\n\n```tsx\ntype LoadingState = { status: 'loading' };\ntype SuccessState = { status: 'success'; data: User[] };\ntype ErrorState = { status: 'error'; error: string };\n\ntype State = LoadingState | SuccessState | ErrorState;\n\nfunction UserList({ state }: { state: State }) {\n  switch (state.status) {\n    case 'loading':\n      return <Spinner />;\n    case 'success':\n      return <UserTable users={state.data} />;\n    case 'error':\n      return <ErrorMessage message={state.error} />;\n  }\n}\n```\n\n## Conclusion\n\nTypeScript is a powerful tool for React developers that can significantly improve code quality and developer experience. By leveraging static typing, you can catch errors earlier, make your code more self-documenting, and enable better tooling support.\n\nIn future articles, we'll explore more advanced TypeScript patterns and how to integrate TypeScript with state management libraries like Redux and Zustand.",
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
    content:
      "# State Management in React in 2023: Beyond Redux\n\nState management is a critical aspect of React applications. While Redux has been the go-to solution for years, the React ecosystem has evolved with many new state management libraries. Let's explore the options available in 2023.\n\n## The Evolution of State Management\n\nState management in React has evolved significantly:\n\n1. **Component State**: React's built-in useState hook\n2. **Context API**: React's built-in solution for sharing state\n3. **Redux**: The traditional heavyweight solution\n4. **Modern Alternatives**: Lighter, simpler libraries\n\n## Built-in Solutions\n\n### useState and useReducer\n\nFor simple applications, React's built-in hooks are often sufficient:\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\nFor more complex state logic, `useReducer` provides a Redux-like approach:\n\n```jsx\nconst initialState = { count: 0 };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  \n  return (\n    <div>\n      <p>Count: {state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n    </div>\n  );\n}\n```\n\n### Context API\n\nFor sharing state across components, the Context API is built into React:\n\n```jsx\nconst ThemeContext = createContext('light');\n\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <ThemedButton />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ThemedButton() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  \n  return (\n    <button\n      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}\n      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}\n    >\n      Toggle Theme\n    </button>\n  );\n}\n```\n\n## Modern State Management Libraries\n\n### Zustand\n\nZustand is a small, fast, and scalable state management solution:\n\n```jsx\nimport create from 'zustand';\n\nconst useStore = create((set) => ({\n  bears: 0,\n  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),\n  removeAllBears: () => set({ bears: 0 }),\n}));\n\nfunction BearCounter() {\n  const bears = useStore((state) => state.bears);\n  return <h1>{bears} around here...</h1>;\n}\n\nfunction Controls() {\n  const increasePopulation = useStore((state) => state.increasePopulation);\n  return <button onClick={increasePopulation}>Add bear</button>;\n}\n```\n\n### Jotai\n\nJotai takes an atomic approach to state management:\n\n```jsx\nimport { atom, useAtom } from 'jotai';\n\nconst countAtom = atom(0);\n\nfunction Counter() {\n  const [count, setCount] = useAtom(countAtom);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\n### Recoil\n\nDeveloped by Facebook, Recoil provides a way to manage state with atoms and selectors:\n\n```jsx\nimport { atom, selector, useRecoilState, useRecoilValue } from 'recoil';\n\nconst countAtom = atom({\n  key: 'countAtom',\n  default: 0,\n});\n\nconst doubleCountSelector = selector({\n  key: 'doubleCount',\n  get: ({ get }) => get(countAtom) * 2,\n});\n\nfunction Counter() {\n  const [count, setCount] = useRecoilState(countAtom);\n  const doubleCount = useRecoilValue(doubleCountSelector);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <p>Double: {doubleCount}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\n## When to Use What\n\n- **Small Apps**: useState and useContext\n- **Medium Apps**: Zustand or Jotai\n- **Large Apps**: Redux Toolkit or Recoil\n- **Server State**: React Query or SWR\n\n## Conclusion\n\nThe state management landscape in React has evolved significantly. While Redux still has its place, especially for large applications with complex state, many modern alternatives offer simpler APIs and better performance for most use cases.\n\nChoose the right tool based on your application's complexity, team familiarity, and specific requirements. Often, a combination of approaches works best, using simpler solutions for UI state and more robust ones for global application state.",
    coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1470&auto=format&fit=crop",
    publishedAt: "2023-09-12T09:45:00Z",
    readingTime: 12,
    category: "React",
    tags: ["React", "State Management", "JavaScript", "Frontend"],
    featured: false,
    views: 1567,
    likes: 103,
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState([])

  // Fetch blog post data
  useEffect(() => {
    const fetchPost = () => {
      // Simulate API call
      setTimeout(() => {
        const foundPost = mockBlogPosts.find((p) => p.slug === slug)

        if (foundPost) {
          setPost(foundPost)
          setLikesCount(foundPost.likes)

          // Find related posts (same category or tags)
          const related = mockBlogPosts
            .filter((p) => p.id !== foundPost.id)
            .filter((p) => p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag)))
            .slice(0, 2)

          setRelatedPosts(related)
        } else {
          // Post not found, but don't redirect - just set post to null
          setPost(null)
        }

        setIsLoading(false)
      }, 1000)
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

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

          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
                  {post.category}
                </Badge>
                {post.featured && <Badge className="bg-primary/90 hover:bg-primary text-white">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop"
                      alt="John Doe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </div>

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

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8 rounded-lg overflow-hidden">
              <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop"
                    alt="John Doe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-xl font-bold mb-2">John Doe</h3>
                  <p className="text-muted-foreground mb-4">
                    Full-stack developer passionate about building beautiful and functional web applications.
                    Specializing in React, Next.js, and modern JavaScript.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
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
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={relatedPost.coverImage || "/placeholder.svg"}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge
                            variant="outline"
                            className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                          >
                            {relatedPost.category}
                          </Badge>
                          <h3 className="font-bold text-lg mb-2">{relatedPost.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{relatedPost.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                            <span className="mx-1">•</span>
                            <Clock className="h-3 w-3" />
                            <span>{relatedPost.readingTime} min read</span>
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
          <div className="text-center py-12">
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

