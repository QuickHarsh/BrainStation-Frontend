import SkeletonBox from "../common/skeleton-box";

const QuizDeckListSkeleton = () => {
  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Heading Skeleton */}
      <SkeletonBox className="w-40 h-6 mb-4 ml-2" />

      {/* Quiz Summary Card Skeleton */}
      <SkeletonBox className="w-full h-24 mb-4 cursor-pointer" />

      {/* Divider Skeleton */}
      <SkeletonBox className="w-full h-1 mb-2" />

      {/* "All" label Skeleton */}
      <SkeletonBox className="w-16 h-6 mb-4 ml-2" />

      {/* Quiz Cards Skeleton */}
      <div className="overflow-hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBox key={index} className="w-full h-20 mb-4" />
        ))}
      </div>
    </div>
  );
};

export default QuizDeckListSkeleton;
