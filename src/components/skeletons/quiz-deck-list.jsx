import SkeletonBox from "../common/skeleton-box";

const QuizDeckListSkeleton = () => {
  return (
    <div className="p-2 mx-2 flex-1 overflow-hidden">
      {/* Heading Skeleton */}
      <SkeletonBox className="h-6 w-24 mb-4 " />

      {/* Quiz Summary Card Skeleton */}
      <div className="cursor-pointer">
        <div className="mt-4 h-[10rem] relative rounded-xl">
          <SkeletonBox className="h-full w-full rounded-xl" />
        </div>
      </div>

      {/* Divider Skeleton */}
      <SkeletonBox className="w-full h-0.5 mt-4 mb-2" />

      {/* Subtitle Skeleton */}
      <SkeletonBox className="h-4 w-16 mb-4" />

      {/* Quiz Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBox key={index} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default QuizDeckListSkeleton;
