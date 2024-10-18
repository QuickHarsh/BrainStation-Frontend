import { useState } from "react";
import { useDispatch } from "react-redux";
import { switchView } from "@/store/lecturesSlice";
import DueQuizCard from "../cards/due-quiz-card";
import Tabs from "../common/Tabs";
import Button from "../common/button";
import ScrollView from "../common/scrollable-view";
import LeftArrowLongIcon from "../icons/left-arrow-long-icon";

// Import the Tabs component

const QuizDueList = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("all-due");

  const handleBackClick = () => {
    dispatch(switchView("quiz-deck"));
  };

  const quizStats = [
    { label: "New", count: 0, bgColor: "#D7C5E5" },
    { label: "Lapsed", count: 0, bgColor: "#A3E4F1" },
    { label: "Review", count: 0, bgColor: "#FEF39D" },
    { label: "Total", count: 0, bgColor: "#AEF8BA" }
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { id: "all-due", label: "All Due" },
    { id: "learning", label: "Learning" }
  ];

  return (
    <div className="p-2 flex-1 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <button className="bg-primary-gray-light max-w-fit p-2 rounded-full" onClick={handleBackClick}>
          <LeftArrowLongIcon size={3} />
        </button>
        <h3 className="font-josfin-sans text-md uppercase opacity-50">Due Quizzes</h3>
      </div>
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
            {Array.from({ length: 10 }).map((_, index) => (
              <DueQuizCard
                key={index}
                question={"What are the four main components of a computer system?"}
                attempt={index % 2 === 0 ? "3" : "5"}
                ease={(index % 3) + 1}
                status={index % 2 === 0 ? "Review" : "Lapsed"}
              />
            ))}
          </div>
        </ScrollView>
      </div>
    </div>
  );
};

export default QuizDueList;
