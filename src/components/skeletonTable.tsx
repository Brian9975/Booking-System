import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonTable() {
  return (
    <div className="flex w-full mx-4 flex-col gap-2">
      {Array.from({ length: 50 }).map((_, index) => (
        <div className="flex  gap-4" key={index}>
          <Skeleton className="h-10 bg-gray-300 flex-1" />
          <Skeleton className="h-10 bg-gray-300 w-24" />
          <Skeleton className="h-10 bg-gray-300 w-20" />
          <Skeleton className="h-10 bg-gray-300 w-20 " />
        </div>
      ))}
    </div>
  )
}
