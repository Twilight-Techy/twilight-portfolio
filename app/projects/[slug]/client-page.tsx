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
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { projects } from "@/data/projects"

export default function ProjectDetailClientPage({
  project: initialProject,
  relatedProjects: initialRelated = [],
}: {
  project: any
  relatedProjects?: any[]
}) {
  const params = useParams()
  const router = useRouter()
  const { slug } = params

  const [project] = useState<any>(initialProject)
  const [isLoading] = useState(false)
  const [relatedProjects] = useState<any[]>(initialRelated)
  const [activeTab, setActiveTab] = useState("overview")

  // Fetch project data

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "In development"
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return "In development"
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date)
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

          <Link href="/projects">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">All Projects</span></Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
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
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-8 rounded-lg overflow-hidden bg-muted dark:bg-zinc-800">
              <Image src={project.coverImage || "/placeholder.svg"} alt={project.title} fill className="object-contain" />
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
                          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden bg-muted dark:bg-zinc-800">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${project.title} - Image ${index + 1}`}
                              fill
                              className="object-contain"
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
                        <div className="relative h-48 w-full overflow-hidden bg-muted dark:bg-zinc-800">
                          <Image
                            src={relatedProject.coverImage || "/placeholder.svg"}
                            alt={relatedProject.title}
                            fill
                            className="object-contain transition-transform duration-500 hover:scale-105"
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
          <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
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

<Footer />
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

