import SkeletonBox from "../common/skeleton-box";

const MainSkeleton = () => {
  return (
    <>
      {/* Skeleton grid for Module Cards */}
      <div className="grid grid-cols-3 gap-4 mt-8 mb-4 mx-1">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="select-none w-[26rem] pt-16 h-[25rem] p-4 flex flex-col justify-center items-center text-center rounded-xl cursor-pointer hover:opacity-75"
            style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.24)" }}
          >
            {/* Title Skeleton */}
            <SkeletonBox className="w-40 h-6 mb-4" />

            {/* Donut Chart Skeleton */}
            <SkeletonBox className="w-32 h-32 rounded-full mb-4" />
            <div className="flex-grow" />
            {/* Divider */}
            <SkeletonBox className="w-[calc(100%-6rem)]  h-1 mt-6 mb-4" />

            {/* Icon & Text Skeleton */}
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-14 h-14 rounded-full" />
              <div className="flex flex-col gap-1">
                <SkeletonBox className="w-32 h-4" />
                <SkeletonBox className="w-40 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainSkeleton;
