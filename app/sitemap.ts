import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { getAllBlogPosts } from "@/lib/mdx"

export const SITE_URL = "https://www.twilighttechy.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/blog", "/github"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: project.completedAt ? new Date(project.completedAt) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }))

  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    blogRoutes = getAllBlogPosts().map((post: any) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  } catch {
    blogRoutes = []
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
