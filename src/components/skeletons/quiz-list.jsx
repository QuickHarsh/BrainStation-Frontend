import SkeletonBox from "../common/skeleton-box";

const QuizListSkeleton = () => {
  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-3">
        <SkeletonBox className="w-10 h-10 rounded-full" />
        <SkeletonBox className="w-40 h-6" />
      </div>

      {/* Title and description skeleton */}
      <div className="flex flex-col gap-2 mb-4">
        <SkeletonBox className="w-full h-8" />
        <SkeletonBox className="w-1/3 h-4" />
      </div>

      {/* Practice button skeleton */}
      <div className="flex justify-end mt-2 pb-4 border-b">
        <SkeletonBox className="w-24 h-8 rounded-lg" />
      </div>

      {/* Quiz list skeleton */}
      <div>
        {[...Array(5)].map((_, index) => (
          <SkeletonBox key={index} className="w-full h-20 mb-4" />
        ))}
      </div>
    </div>
  );
};

export default QuizListSkeleton;
