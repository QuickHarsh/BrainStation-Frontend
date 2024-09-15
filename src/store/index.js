import { configureStore } from "@reduxjs/toolkit";
import lecturesReducer from "./lecturesSlice";
import mcqReducer from "./mcqSlice";
import quizzesReducer from "./quizzesSlice";

const store = configureStore({
  reducer: {
    lectures: lecturesReducer,
    quizzes: quizzesReducer,
    mcq: mcqReducer
  }
});

export default store;
