import SkeletonBox from "../common/skeleton-box";

const QuizDueListSkeleton = () => {
  return (
    <div className="p-2 flex-1 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        {/* Back Button */}
        <SkeletonBox className="w-10 h-10 rounded-full" />

        {/* Header */}
        <SkeletonBox className="w-40 h-6" />
      </div>

      {/* Stats Section */}

      <div className="pb-2 h-full">
        {/* Header Box */}
        <SkeletonBox className="w-full h-16 mb-4" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <SkeletonBox className="h-9" />
          <SkeletonBox className="h-9" />
          <SkeletonBox className="h-9" />
          <SkeletonBox className="h-9" />
        </div>

        {/* Practice Buttons */}
        <div className="border-y pt-4 mt-2 pb-4">
          <div className="flex gap-2 justify-center">
            <SkeletonBox className="w-full h-8 rounded-md" />
            <SkeletonBox className="w-full h-8 rounded-md" />
          </div>
        </div>

        {/* Tabs */}
        <div className="my-4">
          <SkeletonBox className="w-full h-10" />
        </div>

        {/* Quizzes List Skeleton */}
        <div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative my-3">
              <SkeletonBox className="w-full h-20 rounded-lg shadow-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizDueListSkeleton;
