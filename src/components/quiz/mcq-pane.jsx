import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuiz, resetQuizSession } from "@/store/quizzesSlice";
import MCQCard from "./mcq-card";

const MCQPane = ({ isVisible = true, onClose, lectureTitle }) => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const currentQuizIndex = useSelector((state) => state.quizzes.currentQuizIndex);
  const currentQuiz = quizzes[currentQuizIndex];

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      dispatch(resetQuizSession()); // Reset the quiz session when MCQ pane is opened
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible, dispatch]);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
    }
  };

  const handleNextClick = () => {
    if (isAnswered || !selectedAnswer) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      if (currentQuizIndex < quizzes.length - 1) {
        dispatch(nextQuiz());
      } else {
        onClose(); // Close pane if all quizzes are done
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-[90%] h-[90%] p-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-75"
        }`}
      >
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="h-full w-full">
          <p className="text-md text-[#A4A4A4]">
            {lectureTitle}: {currentQuiz.question}
          </p>

          {/* Question */}
          <p className="mt-8 text-3xl font-inter font-semibold">{currentQuiz.question}</p>

          {/* MCQs */}
          <div className="w-full grid grid-cols-2 items-center my-4">
            {[currentQuiz.answer, ...currentQuiz.distractors].map((answer, index) => {
              let cardColorClass = "";
              if (index === 0) cardColorClass = "bg-[#E5DDC5]"; // Original first card color
              if (index === 1) cardColorClass = "bg-[#BED7DC]"; // Original second card color
              if (index === 2) cardColorClass = "bg-[#BEDCC3]"; // Original third card color
              if (index === 3) cardColorClass = "bg-[#D7C5E5]"; // Original fourth card color

              let borderColorClass = "";
              if (isAnswered) {
                if (answer === currentQuiz.answer) {
                  borderColorClass = "border-4 border-green-500";
                } else if (answer === selectedAnswer) {
                  borderColorClass = "border-4 border-red-500";
                }
              }

              return (
                <div key={index} className="justify-self-end" onClick={() => handleAnswerClick(answer)}>
                  <MCQCard className={`${cardColorClass} ${borderColorClass}`} text={answer} />
                </div>
              );
            })}
          </div>
          {/* Next/Skip button */}
          <div className="flex justify-end w-full">
            <button
              className="text-md text-black font-inter bg-slate-200 px-6 py-2 rounded-xl"
              onClick={handleNextClick}
            >
              {isAnswered ? "Next" : "Skip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQPane;
