import LockIcon from "../icons/lock-closed";

const QuizDeckCard = ({ label, title, questionCount, isSelected, disabled }) => (
  <div
    className={`h-[60px] relative rounded-xl flex justify-between items-center p-4 py-8 mx-1.5 my-4 ${
      disabled
        ? "bg-gray-300 cursor-not-allowed opacity-50"
        : `${isSelected ? "bg-primary-blue border-primary-blue border-2 text-gray-100" : "bg-white"} hover:opacity-70 cursor-pointer`
    }`}
    style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.15)" }}
  >
    <div className="flex flex-col overflow-hidden">
      <p className={`uppercase font-josfin-sans whitespace-nowrap ${!disabled && isSelected ? "text-gray-100" : ""}`}>
        {label}
      </p>
      <p
        className={`text-[0.5rem] truncate max-w-[180px] 
      ${!disabled && isSelected ? "text-gray-100" : disabled ? "text-gray-900" : "text-gray-400 hover:text-gray-100"}
      `}
      >
        {title}
      </p>
    </div>
    <p
      className={`text-xs  whitespace-nowrap ml-2
    ${disabled ? "text-gray-700" : isSelected ? "text-gray-100" : "text-gray-400 hover:text-gray-100"}
    `}
    >
      {questionCount} Quizzes
    </p>
    {disabled && (
      <div className="absolute top-2 right-2">
        <LockIcon size={2} />
      </div>
    )}
  </div>
);

export default QuizDeckCard;
