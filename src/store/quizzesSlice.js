// quizzesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  currentQuizIndex: 0
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzesForLecture: (state, action) => {
      // This action will receive fetched questions (quizzes) as payload
      state.quizzes = action.payload || [];
      state.currentQuizIndex = 0; // Reset index when a new lecture is loaded
    },
    nextQuiz: (state) => {
      if (state.currentQuizIndex < state.quizzes.length - 1) {
        state.currentQuizIndex += 1;
      }
    },
    resetQuizSession: (state) => {
      state.currentQuizIndex = 0; // Reset index for a new session
    }
  }
});

export const { setQuizzesForLecture, nextQuiz, resetQuizSession } = quizzesSlice.actions;

export default quizzesSlice.reducer;
