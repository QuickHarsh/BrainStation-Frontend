import { twMerge } from "tailwind-merge";

const MCQCard = ({ className, text }) => {
  const baseClasses =
    "w-full min-h-[12.75rem] xl:w-[34.7rem] xl:h-[12.75rem] flex items-center p-4 sm:p-6 rounded-xl  mx-2 cursor-pointer";
  const mergedClasses = twMerge(baseClasses, className);

  return (
    <div className={mergedClasses}>
      <p className="text-inter text-base sm:text-xl font-semibold">{text}</p>
    </div>
  );
};

export default MCQCard;
