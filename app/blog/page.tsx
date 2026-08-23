import { getAllBlogPosts } from "@/lib/mdx"
import BlogPage from "./client-page"

export default function Page() {
  const allPosts = getAllBlogPosts()
  return <BlogPage allPosts={allPosts} />
}
