import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 flex flex-col gap-3">
      {/* Title + Actions */}
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-48 rounded-md" />

        <div className="flex gap-1 shrink-0">
          <Skeleton className="h-7 w-7 rounded-md" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-lg p-2.5 space-y-2">
        <div className="flex gap-1">
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>

        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-5/6 rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
      </div>

      {/* Requirements */}
      <div className="bg-gray-50 rounded-lg p-2.5 space-y-4">
        <Skeleton className="h-3 w-24 rounded" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <Skeleton className="h-3 w-3 rounded shrink-0" />

              <Skeleton
                className={`h-3 rounded ${item % 2 === 0 ? "w-4/5" : "w-full"}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex flex-col rounded-xl bg-[#F8F8F8] p-3 items-center gap-2"
          >
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-6 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
