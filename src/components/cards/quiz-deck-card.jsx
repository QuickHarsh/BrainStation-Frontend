const QuizDeckCard = () => (
  <>
    <div
      className="h-[60px] rounded-xl flex justify-between items-center p-4 py-8 mx-1.5 my-4 hover:opacity-70 cursor-pointer"
      style={{ boxShadow: "0px 0px 4.4px rgba(0, 0, 0, 0.15)" }}
    >
      <div className="flex flex-col overflow-hidden">
        <p className="uppercase font-josfin-sans whitespace-nowrap">Lecturer 01</p>
        <p className="text-[0.5rem] truncate max-w-[180px] text-gray-300">
          Operating Systems and System Administration - Lecture 1
        </p>
      </div>
      <p className="text-xs text-[#C5C5C5] whitespace-nowrap ml-2">10 Quizzes</p>
    </div>
  </>
);

export default QuizDeckCard;
