import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Skeleton className="h-10 w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] w-full rounded-lg" />

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Skeleton className="h-9 w-40" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-[350px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
