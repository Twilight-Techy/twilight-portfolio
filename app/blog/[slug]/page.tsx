import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/mdx"
import BlogPostPage from "./client-page"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .filter(p => p.meta.category === post.meta.category || p.meta.tags.some(tag => post.meta.tags.includes(tag)))
    .slice(0, 2)

  return <BlogPostPage post={post} relatedPosts={relatedPosts} />
}
