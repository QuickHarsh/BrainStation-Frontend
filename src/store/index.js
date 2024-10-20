import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "./dialogSlice";
import lecturesReducer from "./lecturesSlice";
import mcqReducer from "./mcqSlice";
import modulesReducer from "./moduleSlice";
import practiceReducer from "./practiceSlice";
import quizzesDueReducer from "./quizzesDueSlice";
import quizzesReducer from "./quizzesSlice";

const store = configureStore({
  reducer: {
    lectures: lecturesReducer,
    quizzes: quizzesReducer,
    quizzesDue: quizzesDueReducer,
    mcq: mcqReducer,
    modules: modulesReducer,
    practice: practiceReducer,
    dialog: dialogReducer
  }
});

export default store;
