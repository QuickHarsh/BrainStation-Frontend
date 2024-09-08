import { twMerge } from "tailwind-merge";

const MCQCard = ({ className, text }) => {
  const baseClasses = "w-[34.7rem] h-[12.75rem] flex items-center p-6 rounded-xl mb-4 mx-2 cursor-pointer";
  const mergedClasses = twMerge(baseClasses, className);

  return (
    <div className={mergedClasses}>
      <p className="text-inter text-xl font-semibold">{text}</p>
    </div>
  );
};

export default MCQCard;
