import Link from "next/link"
import { Compass, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100">
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <Compass className="h-20 w-20 text-primary dark:text-blue-500 mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          It looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700" asChild>
          <Link href="/">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </main>

<Footer />
    </div>
  )
}

