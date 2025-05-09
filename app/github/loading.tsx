import { CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-100">
      <header className="bg-background dark:bg-zinc-900 border-b border-border sticky top-0 z-10 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Profile */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-24 bg-gradient-to-r from-blue-600/50 to-blue-400/50"></div>
              </CardHeader>
              <CardContent className="pt-0 relative">
                <div className="flex justify-center">
                  <div className="absolute -top-12 ring-4 ring-card rounded-full overflow-hidden">
                    <Skeleton className="h-24 w-24 rounded-full" />
                  </div>
                </div>

                <div className="mt-16 text-center space-y-2">
                  <Skeleton className="h-7 w-40 mx-auto" />
                  <Skeleton className="h-5 w-32 mx-auto" />
                </div>

                <div className="mt-4">
                  <Skeleton className="h-16 w-full" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>

                <div className="mt-6 space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>

                <div className="mt-6">
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>

            {/* Languages Card */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Repositories */}
          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>

                <div className="space-y-4">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-4 w-full mb-4" />
                          <div className="flex gap-2 mb-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-24" />
                            <div className="flex gap-2">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Contribution Graph */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-64 mx-auto" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

