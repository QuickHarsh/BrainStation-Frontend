import SkeletonBox from "../common/skeleton-box";

function AnalysisSkeleton() {
  return (
    <div className="p-4 px-6">
      <div className="flex flex-col gap-6 pb-2">
        {/* Title */}
        <SkeletonBox className="w-full h-12 rounded-lg" />

        {/* Top Row */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Student Status Skeleton */}
          <div className="flex-1 p-6 border border-gray-200 rounded-xl shadow-lg space-y-4">
            <SkeletonBox className="h-8 w-3/4 mx-auto rounded-md" />
            <div className="flex justify-center">
              <SkeletonBox className="w-24 h-24 rounded-full" />
            </div>
            <div className="mt-6 p-4 rounded-lg shadow-inner space-y-2">
              <SkeletonBox className="h-4 w-1/3 mx-auto" />
              <SkeletonBox className="h-4 w-3/4 mx-auto" />
            </div>
          </div>

          {/* Task Completion Status Skeleton */}
          <div className="flex-1 p-8 border border-gray-200 rounded-xl shadow-md space-y-4">
            <SkeletonBox className="h-8 w-3/4 mx-auto rounded-md" />
            <div className="text-center space-y-2">
              <SkeletonBox className="h-10 w-20 mx-auto rounded-md" />
              <SkeletonBox className="h-4 w-1/2 mx-auto" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <SkeletonBox className="h-10 w-40 rounded-lg" />
              <SkeletonBox className="h-10 w-40 rounded-lg" />
            </div>
            <SkeletonBox className="h-8 w-2/3 mx-auto mt-4" />
          </div>

          {/* Chapter Performance Skeleton */}
          <div className="flex-1 p-8 border border-gray-200 rounded-xl shadow-md space-y-4">
            <SkeletonBox className="h-8 w-3/4 mx-auto rounded-md" />
            <SkeletonBox className="h-64 w-full border border-gray-200 rounded-lg shadow-inner" />
          </div>
        </div>

        {/* Middle Row */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Task Activity Skeleton */}
          <div className="flex-1 p-8 border border-gray-200 rounded-xl shadow-lg space-y-4">
            <SkeletonBox className="h-8 w-3/4 mx-auto rounded-md" />
            <SkeletonBox className="h-56 w-full rounded-lg" />
          </div>

          {/* Performance Type Skeleton */}
          <div className="lg:w-1/2 w-full p-6 border border-gray-200 rounded-xl shadow-lg space-y-4">
            <SkeletonBox className="h-8 w-3/4 mx-auto rounded-md" />
            <SkeletonBox className="h-56 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisSkeleton;
