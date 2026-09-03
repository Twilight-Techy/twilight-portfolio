import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import ProjectDetailClientPage from "./client-page"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return { title: "Project not found" }
  }

  const url = `/projects/${project.slug}`

  return {
    title: `${project.title}, ${project.subtitle}`,
    description: project.description,
    keywords: project.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title}, ${project.subtitle}`,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}, ${project.subtitle}`,
      description: project.description,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .filter(
      (p) => p.category === project.category || p.tags.some((tag) => project.tags.includes(tag)),
    )
    .slice(0, 2)

  return <ProjectDetailClientPage project={project} relatedProjects={relatedProjects} />
}
