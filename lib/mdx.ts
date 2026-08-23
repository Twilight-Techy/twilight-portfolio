import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  views?: number;
  likes?: number;
}

export function getBlogSlugs() {
  if (!fs.existsSync(blogsDirectory)) {
    return []
  }
  return fs.readdirSync(blogsDirectory)
}

export function getBlogPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    meta: data as BlogPostMeta,
    content
  }
}

export function getAllBlogPosts() {
  const slugs = getBlogSlugs()
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post) => post !== null)
    .map((post) => post!)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.meta.publishedAt > post2.meta.publishedAt ? -1 : 1))
  
  return posts
}
