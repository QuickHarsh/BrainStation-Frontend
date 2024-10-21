// ExpandedSidePanel.js
import { useSelector } from "react-redux";
import Logo from "../common/logo";
import LectureList from "../side-panel-components/lecturer-list";
import QuizDeckList from "../side-panel-components/quiz-deck-list";
import QuizDueList from "../side-panel-components/quiz-due-list";
import QuizList from "../side-panel-components/quiz-list";

// Ensure this is imported

const ExpandedSidePanel = ({ isVisible }) => {
  const currentView = useSelector((state) => state.lectures.currentView);

  return (
    <div
      className={`h-full border-r flex flex-col bg-white backdrop:select-none z-[99] transition-all duration-300 ease-in-out ${
        isVisible ? "translate-x-0 w-80 opacity-100" : "-translate-x-1 w-0 opacity-0"
      }`}
      style={{ boxShadow: "1px 70px 5.8px rgba(0, 0, 0, 0.20)" }}
    >
      <div className="border-b py-[0.72rem] flex items-center justify-between px-5">
        <Logo />
      </div>
      {/* Conditionally render components based on the current view */}
      {currentView === "lecturer" && <LectureList />}
      {currentView === "quiz" && <QuizList />}
      {currentView === "quiz-deck" && <QuizDeckList />}
      {currentView === "due-quiz" && <QuizDueList />}
    </div>
  );
};

export default ExpandedSidePanel;
