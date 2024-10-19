// Assuming this is where you navigate to the /quiz-deck page
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { switchToQuizDeck } from "@/store/lecturesSlice";

const QuizDeck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchToQuizDeck());
  }, [dispatch]);

  return <div className="flex justify-center items-center h-full">Analytics Yet to come... :)</div>;
};

export default QuizDeck;
