// SkeletonBox.jsx
import { twMerge } from "tailwind-merge";

const SkeletonBox = ({ className, ...props }) => {
  return <div className={twMerge("animate-pulse bg-gray-300 rounded", className)} {...props} />;
};

export default SkeletonBox;
