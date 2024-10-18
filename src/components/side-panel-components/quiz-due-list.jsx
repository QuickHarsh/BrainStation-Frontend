import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { GetQuizzesDueByToday } from "@/service/quiz";
import { switchView } from "@/store/lecturesSlice";
import DueQuizCard from "../cards/due-quiz-card";
import Tabs from "../common/Tabs";
import AnimatingDots from "../common/animating-dots";
import Button from "../common/button";
import ScrollView from "../common/scrollable-view";
import LeftArrowLongIcon from "../icons/left-arrow-long-icon";

// Import dayjs for date manipulation

const QuizDueList = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("all-due");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackClick = () => {
    dispatch(switchView("quiz-deck"));
  };

  const quizStats = [
    { label: "New", count: 0, bgColor: "#D7C5E5" },
    { label: "Lapsed", count: 0, bgColor: "#A3E4F1" },
    { label: "Review", count: 0, bgColor: "#FEF39D" },
    { label: "Total", count: 0, bgColor: "#AEF8BA" }
  ];

  const tabs = [
    { id: "all-due", label: "All Due" },
    { id: "learning", label: "Learning" }
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetQuizzesDueByToday();
      if (response.success) {
        setQuizzes(response.data.docs);
      } else {
        setError("Failed to fetch due quizzes.");
      }
    } catch (err) {
      setError("An error occurred while fetching quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Check if the quiz should be locked based on the time
  const checkIfLocked = (quiz) => {
    const { status, current_step, learningSteps, updatedAt } = quiz;
    const updatedAtTime = dayjs(updatedAt);
    const currentTime = dayjs();

    // Only for "new" or "lapsed" quizzes
    if (status === "new" || status === "lapsed") {
      const currentLearningStepMinutes = learningSteps[current_step];
      const nextAvailableTime = updatedAtTime.add(currentLearningStepMinutes, "minute");

      // Lock the quiz if the current time is before the next available learning step time
      if (currentTime.isBefore(nextAvailableTime)) {
        return true; // isLocked = true
      }
    }
    return false; // isLocked = false
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <AnimatingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-2 flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button className="bg-primary-gray-light max-w-fit p-2 rounded-full" onClick={handleBackClick}>
          <LeftArrowLongIcon size={3} />
        </button>
        <h3 className="font-josfin-sans text-md uppercase opacity-50">Due Quizzes</h3>
      </div>

      {/* Quiz Info and Tabs */}
      <div className="h-full">
        <ScrollView initialMaxHeight="145px">
          <div className="pb-2 h-full">
            <div className="mb-2 bg-slate-300 rounded-lg p-4">
              <p className=" text-[14px]">
                <span className="font-semibold text-left">Today’s Recall Deck:</span>{" "}
                <span className="text-justify">Strengthen What You’ve Learned with Spaced Repetition!</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quizStats.map((quiz) => (
                <div
                  key={quiz.label}
                  className="flex justify-between text-sm p-2 rounded-lg"
                  style={{ backgroundColor: quiz.bgColor }}
                >
                  <p>{quiz.label}:</p>
                  <p>{quiz.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice buttons */}
          <div className="border-b mt-2 pb-4">
            <div className="flex items-center justify-center mt-2">
              <p className="text-base mb-2 font-josfin-sans text-gray-400">Practice</p>
              <div className="flex-1 ml-2 border-b border-gray-200"></div>
            </div>
            <div className="flex gap-2 ">
              <Button className={"font-medium"}>All Due</Button>
              <Button className={"font-medium"}>New / Lapsed</Button>
            </div>
          </div>

          {/* Quizzes Pane */}
          <div>
            <Tabs tabs={tabs} selectedTab={selectedTab} handleTabClick={handleTabClick} />
          </div>
          <div>
            {quizzes.length > 0 ? (
              quizzes.map((quiz, index) => (
                <DueQuizCard
                  key={index}
                  question={quiz.questionDetails.question}
                  attempt={quiz.attemptCount}
                  ease={quiz.ease_factor}
                  status={quiz.status}
                  isLocked={checkIfLocked(quiz)}
                />
              ))
            ) : (
              <p className="text-center mt-10 text-lg font-medium text-gray-400">No due quizzes available!</p>
            )}
          </div>
        </ScrollView>
      </div>
    </div>
  );
};

export default QuizDueList;
