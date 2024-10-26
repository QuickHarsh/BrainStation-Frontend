import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffleArray } from "@/helper/shuffleArray";
import { respondToQuiz } from "@/service/quiz";
import { addPracticeResult, clearPracticeHistory } from "@/store/practiceSlice";
import { nextDueQuiz, resetDueQuizSession, triggerQuizRefresh } from "@/store/quizzesDueSlice";
import MCQCard from "./mcq-card";
import QuizSummery from "./summery";

const MCQDuePane = ({ isVisible = true, onClose }) => {
  const dispatch = useDispatch();
  const dueQuizzes = useSelector((state) => state.quizzesDue.dueQuizzes);
  const currentQuizIndex = useSelector((state) => state.quizzesDue.currentQuizIndex);
  const currentQuiz = dueQuizzes ? dueQuizzes[currentQuizIndex] : null;
  const practiceHistory = useSelector((state) => state.practice.practiceHistory);

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSummery, setShowSummery] = useState(false);
  const [localAttemptCounts, setLocalAttemptCounts] = useState({});

  useEffect(() => {
    console.log("dueQuizes", dueQuizzes);
  }, [dueQuizzes]);

  useEffect(() => {
    if (isVisible) {
      dispatch(resetDueQuizSession());
      dispatch(clearPracticeHistory());
      setShowSummery(false);
    }
  }, [isVisible, dispatch]);

  useEffect(() => {
    if (currentQuiz) {
      const distractors = Array.isArray(currentQuiz.questionDetails.distractors)
        ? currentQuiz.questionDetails.distractors
        : [];
      const answers = shuffleArray([currentQuiz.questionDetails.answer, ...distractors]);
      setShuffledAnswers(answers);
    }
  }, [currentQuiz]);

  // Determine the question to display based on attempt_question
  const getQuestionToDisplay = () => {
    if (!currentQuiz) return "";

    const { questionDetails, attempt_question } = currentQuiz;
    const { question, alternative_questions } = questionDetails;

    if (attempt_question === 0) {
      return question;
    }

    const altIndex = attempt_question - 1;
    return alternative_questions && altIndex < alternative_questions.length
      ? alternative_questions[altIndex]
      : question; // Fallback to main question if out of bounds
  };

  const sendQuizResponse = (response) => {
    const alternativeQuestions = currentQuiz.questionDetails.alternative_questions || [];
    let newAttempt = (currentQuiz.attempt_question ?? 0) + 1;

    // Reset to 0 if it exceeds alternative questions
    if (newAttempt > alternativeQuestions.length) {
      newAttempt = 0;
    }

    // Update local attempt counts
    setLocalAttemptCounts((prev) => ({
      ...prev,
      [currentQuiz.questionId]: newAttempt
    }));

    // Prepare data for the response
    const data = {
      questionId: currentQuiz.questionId,
      lectureId: currentQuiz.lectureId,
      moduleId: currentQuiz.moduleId,
      response,
      attempt_question: newAttempt
    };

    respondToQuiz(data)
      .then(() => console.log("Quiz response sent successfully:", response))
      .catch((error) => console.error("Error sending quiz response:", error));

    dispatch(
      addPracticeResult({
        id: currentQuiz._id,
        question: currentQuiz.questionDetails.question,
        correctAnswer: currentQuiz.questionDetails.answer,
        difficulty: response
      })
    );
  };

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      const isCorrectAnswer = answer === currentQuiz.questionDetails.answer;
      setIsCorrect(isCorrectAnswer);

      // Immediately send "wrong" response if the answer is incorrect
      if (!isCorrectAnswer) {
        sendQuizResponse("wrong");
      }
    }
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentQuizIndex < dueQuizzes.length - 1) {
      dispatch(nextDueQuiz());
    } else {
      setShowSummery(true);
    }
  };

  const handleDifficultyClick = (selectedDifficulty) => {
    sendQuizResponse(selectedDifficulty.toLowerCase());
    handleNextClick();
  };

  const handleSummeryClose = () => {
    const updatedDueQuizzes = dueQuizzes.map((quiz) => ({
      ...quiz,
      attempt_question: localAttemptCounts[quiz.questionId] ?? quiz.attempt_question
    }));

    dispatch(triggerQuizRefresh(updatedDueQuizzes));

    dispatch(resetDueQuizSession());
    onClose();
    setTimeout(() => setShowSummery(false), 300);
  };

  if (!currentQuiz || dueQuizzes.length === 0) {
    return null;
  }

  const progressPercentage = ((currentQuizIndex + 1) / dueQuizzes.length) * 100;

  if (showSummery) {
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-white relative rounded-xl shadow-lg w-[90%] h-[90%] p-6 transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-90"}`}
        >
          <QuizSummery
            onClose={handleSummeryClose}
            summeryData={{ title: "", feedback: "Well Done!", tableData: practiceHistory }}
            isFromDue={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`bg-white relative rounded-xl shadow-lg w-[90%] h-[90%]  transform transition-all duration-300 ${isVisible ? "scale-100" : "scale-90"}`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        <div className="h-full w-full relative p-6">
          <p className="mt-2 text-[24px] font-inter font-semibold">{getQuestionToDisplay()}</p>
          <div className="flex items-center h-[calc(100%-150px)]">
            <div className="w-full grid grid-cols-2 gap-2 md:gap-4 items-center my-4">
              {shuffledAnswers.map((answer, index) => {
                let cardColorClass = "";
                if (index === 0) cardColorClass = "bg-[#E5DDC5]";
                if (index === 1) cardColorClass = "bg-[#BED7DC]";
                if (index === 2) cardColorClass = "bg-[#BEDCC3]";
                if (index === 3) cardColorClass = "bg-[#D7C5E5]";

                let borderColorClass = "";
                if (isAnswered) {
                  if (answer === currentQuiz.questionDetails.answer) {
                    borderColorClass = "border-4 border-green-500";
                  } else if (answer === selectedAnswer) {
                    borderColorClass = "border-4 border-red-500";
                  }
                }

                const alignmentClass = index % 2 === 0 ? "justify-self-end" : "justify-self-start";

                return (
                  <div key={index} className={`${alignmentClass}`} onClick={() => handleAnswerClick(answer)}>
                    <MCQCard className={`${cardColorClass} ${borderColorClass}`} text={answer} />
                  </div>
                );
              })}
            </div>
          </div>

          {!isAnswered && (
            <div className="text-center text-red-300 font-semibold">Please select an answer to continue!</div>
          )}

          {isAnswered && isCorrect && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => handleDifficultyClick("easy")}
                className="bg-[#B2FFA5] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultyClick("normal")}
                className="bg-[#A5D9FF] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Normal
              </button>
              <button
                onClick={() => handleDifficultyClick("hard")}
                className="bg-[#FFA5A5] w-20 h-20 flex justify-center items-center rounded-full hover:opacity-80"
              >
                Hard
              </button>
            </div>
          )}

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

          <div className="absolute bottom-[0.05px] left-0 right-0 rounded-bl-xl rounded-br-xl w-full h-2 bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${progressPercentage}%`, transition: "width 0.3s ease" }}
            ></div>
          </div>

          <div className="absolute bottom-4 right-6 text-sm font-semibold text-gray-600">
            {currentQuizIndex + 1} of {dueQuizzes.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQDuePane;
