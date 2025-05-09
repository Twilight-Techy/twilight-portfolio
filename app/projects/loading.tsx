import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section Skeleton */}
        <div className="mb-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Skeleton className="h-6 w-24 mx-auto" />
            <Skeleton className="h-12 w-48 mx-auto" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
        </div>

        {/* Search and Filters Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div>
          <div className="mb-6 flex justify-between items-center">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="overflow-hidden h-full">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

