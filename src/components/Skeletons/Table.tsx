import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
};

export function TableSkeleton({
  rows = 6,
  columns = 6,
}: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-gray-50/50">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-4 py-4">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-100"
              >
                {Array.from({ length: columns }).map((_, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-4">
                    <Skeleton
                      className={`h-4 ${
                        columnIndex === 0
                          ? "w-32"
                          : columnIndex === columns - 1
                            ? "ml-auto w-20"
                            : "w-24"
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}