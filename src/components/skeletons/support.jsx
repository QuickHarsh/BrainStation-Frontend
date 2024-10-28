import SkeletonBox from "../common/skeleton-box";

const SupportSkeleton = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-pulse">
      {/* Main Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 p-8 rounded-lg bg-slate-100">
        <div className="space-y-4">
          <SkeletonBox className="h-10 w-3/4 mb-2" />
          <SkeletonBox className="h-6 w-5/6" />
        </div>

        {/* Right Section - Task Boxes */}
        <div className="flex space-x-8 justify-center">
          <SkeletonBox className="h-24 w-32 rounded-lg" />
          <SkeletonBox className="h-24 w-32 rounded-lg" />
        </div>

        {/* Action Buttons */}
        <div className="flex col-span-2 items-center gap-4 w-full mt-2">
          <SkeletonBox className="h-12 w-36 rounded-full" />
          <SkeletonBox className="h-12 w-36 rounded-full" />
          <SkeletonBox className="h-12 w-36 rounded-full" />
        </div>
      </div>

      {/* Module Predictions Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-8 rounded-lg bg-slate-100">
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
          <SkeletonBox className="h-8 w-2/3 mb-4" />
          <SkeletonBox className="h-6 w-full" />
          <SkeletonBox className="h-6 w-full" />
          <SkeletonBox className="h-6 w-full" />
        </div>
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
          <SkeletonBox className="h-8 w-1/2 mb-4" />
          <SkeletonBox className="h-6 w-full" />
          <SkeletonBox className="h-6 w-full" />
          <SkeletonBox className="h-4 w-1/3" />
        </div>
      </div>

      {/* Struggling Areas Section */}
      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <SkeletonBox className="h-10 w-1/2 mb-6" />
        <SkeletonBox className="h-20 w-full mb-4 rounded-lg" />
        <SkeletonBox className="h-20 w-full rounded-lg" />
      </div>

      {/* Module Performance Section */}
      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <SkeletonBox className="h-10 w-1/2 mb-4" />
        <SkeletonBox className="h-16 w-full mb-4 rounded-lg" />
        <SkeletonBox className="h-16 w-full rounded-lg" />
      </div>

      {/* Study Recommendations Section */}
      <div className="p-6 bg-slate-100 rounded-lg shadow-md">
        <SkeletonBox className="h-10 w-1/2 mb-6" />
        <SkeletonBox className="h-12 w-full mb-3 rounded-lg" />
        <SkeletonBox className="h-12 w-full mb-3 rounded-lg" />
        <SkeletonBox className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default SupportSkeleton;
