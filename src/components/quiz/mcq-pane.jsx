import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleArray } from "@/helper/shuffleArray";
import { nextQuiz, resetQuizSession } from "@/store/quizzesSlice";
import MCQCard from "./mcq-card";

const MCQPane = ({ isVisible = true, onClose, lectureTitle }) => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  const currentQuizIndex = useSelector((state) => state.quizzes.currentQuizIndex);
  const currentQuiz = quizzes[currentQuizIndex];

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Track if the quiz session is new to avoid unnecessary resets
  const [quizSessionStarted, setQuizSessionStarted] = useState(false);

  useEffect(() => {
    if (isVisible && !quizSessionStarted) {
      // Reset only if the quiz session is new (i.e., the pane is opened for the first time)
      dispatch(resetQuizSession());
      setQuizSessionStarted(true); // Set session started flag
    }
  }, [isVisible, quizSessionStarted, dispatch]);

  useEffect(() => {
    if (currentQuiz) {
      const answers = shuffleArray([currentQuiz.answer, ...currentQuiz.distractors]);
      setShuffledAnswers(answers);
    }
  }, [currentQuiz]);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      setIsCorrect(answer === currentQuiz.answer);
    }
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentQuizIndex < quizzes.length - 1) {
      dispatch(nextQuiz());
    } else {
      onClose();
      setQuizSessionStarted(false); // Reset the session tracking for next time
    }
  };

  const handleDifficultyClick = () => {
    handleNextClick(); // Automatically go to the next question after selecting difficulty
  };

  if (!currentQuiz || quizzes.length === 0) {
    return null;
  }

  // Calculate progress percentage
  const progressPercentage = ((currentQuizIndex + 1) / quizzes.length) * 100;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white relative rounded-xl shadow-lg w-[90%] h-[90%]  transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        <div className="h-full w-full relative p-6">
          <p className="text-sm text-[#A4A4A4]">{lectureTitle}</p>

          {/* Question */}
          <p className="mt-2 text-[24px] font-inter font-semibold">{currentQuiz.question}</p>

          {/* MCQs */}
          <div className="flex items-center h-[calc(100%-150px)]">
            <div className="w-full grid grid-cols-2 items-center  my-4">
              {shuffledAnswers.map((answer, index) => {
                let cardColorClass = "";
                if (index === 0) cardColorClass = "bg-[#E5DDC5]";
                if (index === 1) cardColorClass = "bg-[#BED7DC]";
                if (index === 2) cardColorClass = "bg-[#BEDCC3]";
                if (index === 3) cardColorClass = "bg-[#D7C5E5]";

                let borderColorClass = "";
                if (isAnswered) {
                  if (answer === currentQuiz.answer) {
                    borderColorClass = "border-4 border-green-500";
                  } else if (answer === selectedAnswer) {
                    borderColorClass = "border-4 border-red-500";
                  }
                }

                const alignmentClass = index % 2 === 0 ? "justify-self-end" : "justify-self-start";

                return (
                  <div key={index} className={alignmentClass} onClick={() => handleAnswerClick(answer)}>
                    <MCQCard className={`${cardColorClass} ${borderColorClass}`} text={answer} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message before answer selection */}
          {!isAnswered && (
            <div className="text-center text-red-300 font-semibold">Please select an answer to continue!</div>
          )}

          {/* Difficulty Selection */}
          {isAnswered && isCorrect && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => handleDifficultyClick("Easy")}
                className="bg-[#B2FFA5] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultyClick("Normal")}
                className="bg-[#A5D9FF] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Normal
              </button>
              <button
                onClick={() => handleDifficultyClick("Hard")}
                className="bg-[#FFA5A5] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Hard
              </button>
            </div>
          )}

          {/* Next button for wrong answers */}
          {isAnswered && !isCorrect && (
            <div className="flex justify-center w-full mt-4">
              <button
                className="text-md text-black font-inter bg-slate-200 px-6 py-2 rounded-xl"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-[0.05px] left-0 right-0 rounded-bl-xl rounded-br-xl w-full h-2 bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{
                width: `${progressPercentage}%`,
                transition: "width 0.3s ease"
              }}
            ></div>
          </div>

          {/* Quiz Counter */}
          <div className="absolute bottom-4 right-6 text-sm font-semibold text-gray-600">
            {currentQuizIndex + 1} of {quizzes.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQPane;
