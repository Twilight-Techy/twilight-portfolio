"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Code,
  ChevronLeft,
  ExternalLink,
  Github,
  ArrowRight,
  ArrowLeft,
  Layers,
  CheckCircle,
  Lightbulb,
  PanelRight,
  Rocket,
  ImageIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Mock projects data (would be replaced with actual API calls)
const mockProjects = [
  {
    id: 1,
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    subtitle: "A full-stack online shopping experience",
    description:
      "A comprehensive e-commerce platform with payment integration, admin dashboard, and responsive design.",
    longDescription:
      "This e-commerce platform provides a complete online shopping experience with product listings, shopping cart functionality, secure checkout with Stripe integration, user accounts, and an admin dashboard for managing products, orders, and customers. The platform is built with scalability in mind and features responsive design for optimal viewing on all devices.",
    challenge:
      "The main challenge was creating a seamless shopping experience across devices while ensuring secure payment processing and efficient inventory management. Additionally, the admin dashboard needed to provide comprehensive analytics and easy product management.",
    solution:
      "I implemented a React frontend with Next.js for server-side rendering and SEO benefits. The backend uses Node.js with Express and MongoDB for flexible data storage. Stripe was integrated for secure payments, and the admin dashboard was built with real-time data visualization using Chart.js. The responsive design was achieved using Tailwind CSS.",
    outcome:
      "The platform has successfully processed over 500 orders in its first month, with a cart abandonment rate 15% lower than industry average. The admin dashboard has streamlined inventory management, reducing the time spent on administrative tasks by 40%.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572584642822-6f8de0243c93?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612422656768-d5e4ec31fac0?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561069934-eee225952461?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS", "Next.js"],
    category: "fullstack",
    link: "https://ecommerce-demo.com",
    github: "https://github.com/johndoe/ecommerce-platform",
    featured: true,
    completedAt: "2023-03-15",
    duration: "3 months",
    client: "Self-initiated",
    role: "Full-stack Developer",
    keyFeatures: [
      "User authentication and profiles",
      "Product search and filtering",
      "Shopping cart and wishlist",
      "Secure checkout with Stripe",
      "Order tracking and history",
      "Admin dashboard with analytics",
      "Inventory management",
      "Responsive design",
    ],
    technologies: {
      frontend: ["React", "Next.js", "Tailwind CSS", "Redux"],
      backend: ["Node.js", "Express", "MongoDB"],
      deployment: ["Vercel", "MongoDB Atlas"],
      other: ["Stripe API", "Chart.js", "Cloudinary"],
    },
  },
  {
    id: 2,
    slug: "ai-image-generator",
    title: "AI Image Generator",
    subtitle: "Creating art with artificial intelligence",
    description: "Web app that generates images based on text prompts using AI models.",
    longDescription:
      "This AI-powered image generation application allows users to create unique images by simply describing what they want to see. Using OpenAI's DALL-E API, the application translates text descriptions into visual art. Users can save their creations, share them on social media, and explore a gallery of community-generated images for inspiration.",
    challenge:
      "The primary challenge was creating an intuitive interface for text-to-image generation while managing API costs and optimizing image processing. Additionally, implementing a responsive gallery that could handle various image dimensions without breaking the layout was complex.",
    solution:
      "I built a React application with Next.js that interfaces with OpenAI's API. The frontend features a clean, intuitive prompt input system with suggestion helpers. I implemented a token estimation system to help users craft effective prompts and a caching layer to reduce redundant API calls. The gallery uses a masonry layout to accommodate various image dimensions.",
    outcome:
      "The application has generated over 10,000 images in its first two months, with a 40% share rate to social media. User retention is strong, with 65% of users returning to create multiple images.",
    coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=1528&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1528&auto=format&fit=crop",
    ],
    tags: ["Next.js", "OpenAI", "TailwindCSS", "TypeScript"],
    category: "ai",
    link: "https://ai-image-gen.vercel.app",
    github: "https://github.com/johndoe/ai-image-generator",
    featured: true,
    completedAt: "2023-01-20",
    duration: "6 weeks",
    client: "Self-initiated",
    role: "Frontend Developer & AI Integration",
    keyFeatures: [
      "Text-to-image generation",
      "Prompt suggestions and history",
      "Image gallery with filtering",
      "User collections",
      "Social media sharing",
      "Community showcase",
      "User authentication",
    ],
    technologies: {
      frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB"],
      deployment: ["Vercel", "MongoDB Atlas"],
      other: ["OpenAI API", "Cloudinary", "NextAuth.js"],
    },
  },
  {
    id: 3,
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    subtitle: "Your personal health companion",
    description: "Mobile app for tracking workouts, nutrition, and fitness progress.",
    longDescription:
      "This comprehensive fitness tracking application helps users monitor their workouts, nutrition, and overall health progress. The app provides personalized workout plans, nutrition tracking with a food database, progress visualization with charts, and integration with popular fitness wearables. Users can set goals, track their achievements, and join challenges to stay motivated.",
    challenge:
      "Creating a unified platform that could track various aspects of fitness while keeping the user experience simple and engaging was the main challenge. Additionally, ensuring accurate data synchronization between devices and wearables required robust backend architecture.",
    solution:
      "I developed a React Native application for cross-platform compatibility, with a Firebase backend for real-time data synchronization. The app uses Redux for state management and implements a modular architecture to handle different tracking modules. For wearable integration, I used the respective APIs and created a unified data model to normalize information from different sources.",
    outcome:
      "The app has been downloaded over 25,000 times with a 4.7-star average rating. User engagement metrics show that 70% of users log in at least 3 times per week, and the average user session length is 8 minutes.",
    coverImage: "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?q=80&w=1470&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    category: "mobile",
    link: "https://fitnesstracker.app",
    github: "https://github.com/johndoe/fitness-tracker",
    featured: false,
    completedAt: "2022-11-10",
    duration: "4 months",
    client: "HealthTech Inc.",
    role: "Mobile Developer",
    keyFeatures: [
      "Workout tracking and planning",
      "Nutrition logging with food database",
      "Progress visualization",
      "Goal setting and achievements",
      "Wearable device integration",
      "Community challenges",
      "Personalized recommendations",
    ],
    technologies: {
      frontend: ["React Native", "Expo", "Redux", "Victory Charts"],
      backend: ["Firebase", "Cloud Functions"],
      deployment: ["App Store", "Google Play", "Firebase Hosting"],
      other: ["Fitbit API", "Apple HealthKit", "Google Fit API"],
    },
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const [project, setProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedProjects, setRelatedProjects] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  // Fetch project data
  useEffect(() => {
    const fetchProject = () => {
      // Simulate API call
      setTimeout(() => {
        const foundProject = mockProjects.find((p) => p.slug === slug)

        if (foundProject) {
          setProject(foundProject)

          // Find related projects (same category or tags)
          const related = mockProjects
            .filter((p) => p.id !== foundProject.id)
            .filter(
              (p) => p.category === foundProject.category || p.tags.some((tag) => foundProject.tags.includes(tag)),
            )
            .slice(0, 2)

          setRelatedProjects(related)
        } else {
          // Project not found, but don't redirect - just set project to null
          setProject(null)
        }

        setIsLoading(false)
      }, 1000)
    }

    if (slug) {
      fetchProject()
    }
  }, [slug])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
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

          <Link href="/projects">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              All Projects
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <ProjectDetailSkeleton />
        ) : project ? (
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400 border-primary/20 dark:border-blue-500/20"
                >
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </Badge>
                {project.featured && <Badge className="bg-primary/90 hover:bg-primary text-white">Featured</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.subtitle}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-muted">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                {project.link && (
                  <Button
                    className="gap-2 bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                    asChild
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" className="gap-2" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8 rounded-lg overflow-hidden">
              <Image src={project.coverImage || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>

            {/* Project Content */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-12">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview" className="gap-2">
                  <Layers className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="features" className="gap-2">
                  <CheckCircle className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Features</span>
                </TabsTrigger>
                <TabsTrigger value="process" className="gap-2">
                  <Lightbulb className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Process</span>
                </TabsTrigger>
                <TabsTrigger value="gallery" className="gap-2">
                  <ImageIcon className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Gallery</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{project.longDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Client</h3>
                        <p className="text-muted-foreground">{project.client}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Role</h3>
                        <p className="text-muted-foreground">{project.role}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Completed</h3>
                        <p className="text-muted-foreground">{formatDate(project.completedAt)}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Duration</h3>
                        <p className="text-muted-foreground">{project.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.frontend.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Backend</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.backend.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Deployment</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.deployment.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Other Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.other.map((tech) => (
                          <Badge
                            key={tech}
                            className="bg-primary/20 text-primary dark:bg-blue-500/20 dark:text-blue-400 hover:bg-primary/30"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Challenge & Solution</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <PanelRight className="h-5 w-5 text-amber-500" />
                          <h3 className="font-semibold">The Challenge</h3>
                        </div>
                        <p className="text-muted-foreground">{project.challenge}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Lightbulb className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold">The Solution</h3>
                        </div>
                        <p className="text-muted-foreground">{project.solution}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Outcome</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Rocket className="h-5 w-5 text-primary dark:text-blue-400" />
                        <h3 className="font-semibold">Results & Impact</h3>
                      </div>
                      <p className="text-muted-foreground">{project.outcome}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Development Process</h2>
                  <div className="space-y-8">
                    <div className="relative pl-8 border-l-2 border-primary/30 dark:border-blue-500/30">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary dark:bg-blue-500"></div>
                      <h3 className="font-semibold text-lg mb-2">Research & Planning</h3>
                      <p className="text-muted-foreground mb-4">
                        I began by researching similar applications and identifying key features that would set this
                        project apart. User personas were created to guide the design process, and a comprehensive
                        project plan was developed.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/30 dark:border-blue-500/30">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary dark:bg-blue-500"></div>
                      <h3 className="font-semibold text-lg mb-2">Design & Prototyping</h3>
                      <p className="text-muted-foreground mb-4">
                        Wireframes were created to establish the basic layout and user flow. These were then transformed
                        into high-fidelity mockups and interactive prototypes for user testing and feedback.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/30 dark:border-blue-500/30">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary dark:bg-blue-500"></div>
                      <h3 className="font-semibold text-lg mb-2">Development</h3>
                      <p className="text-muted-foreground mb-4">
                        The development phase followed an agile methodology with two-week sprints. The frontend and
                        backend were developed in parallel, with regular integration points. Continuous integration
                        ensured code quality throughout the process.
                      </p>
                    </div>

                    <div className="relative pl-8 border-l-2 border-primary/30 dark:border-blue-500/30">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary dark:bg-blue-500"></div>
                      <h3 className="font-semibold text-lg mb-2">Testing & Refinement</h3>
                      <p className="text-muted-foreground mb-4">
                        Comprehensive testing was conducted, including unit tests, integration tests, and user
                        acceptance testing. A beta version was released to a select group of users for feedback, which
                        informed the final refinements.
                      </p>
                    </div>

                    <div className="relative pl-8">
                      <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary dark:bg-blue-500"></div>
                      <h3 className="font-semibold text-lg mb-2">Deployment & Monitoring</h3>
                      <p className="text-muted-foreground mb-4">
                        The application was deployed using a CI/CD pipeline, ensuring smooth and reliable releases.
                        Post-launch monitoring was set up to track performance, user behavior, and identify any issues
                        for immediate resolution.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
              </TabsContent>
            </Tabs>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`}>
                      <Card className="h-full hover:border-primary/50 dark:hover:border-blue-500/50 transition-all duration-300">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={relatedProject.coverImage || "/placeholder.svg"}
                            alt={relatedProject.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <Badge
                            variant="outline"
                            className="mb-2 bg-primary/10 text-primary dark:bg-blue-500/10 dark:text-blue-400"
                          >
                            {relatedProject.category.charAt(0).toUpperCase() + relatedProject.category.slice(1)}
                          </Badge>
                          <h3 className="font-bold text-lg mb-2">{relatedProject.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                            {relatedProject.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {relatedProject.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-muted">
                                {tag}
                              </Badge>
                            ))}
                            {relatedProject.tags.length > 3 && (
                              <Badge variant="secondary" className="bg-muted">
                                +{relatedProject.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" className="w-full gap-2" size="sm">
                            View project
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4" />
                  All Projects
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
            <Layers className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Project not found</h3>
            <p className="text-muted-foreground mb-4">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="outline" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
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

// Project Detail Skeleton Component
function ProjectDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />

        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />

      {/* Tabs Skeleton */}
      <div className="mb-12">
        <div className="grid grid-cols-4 gap-2 mb-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>

          <Skeleton className="h-8 w-48 mt-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>

      {/* Related Projects Skeleton */}
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

