import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dueQuizzes: [],
  currentQuizIndex: 0
};

const quizzesDueSlice = createSlice({
  name: "quizzesDue",
  initialState,
  reducers: {
    setDueQuizzes: (state, action) => {
      state.dueQuizzes = action.payload || [];
      state.currentQuizIndex = 0; // Reset index when new due quizzes are set
    },
    nextDueQuiz: (state) => {
      if (state.currentQuizIndex < state.dueQuizzes.length - 1) {
        state.currentQuizIndex += 1;
      }
    },
    resetDueQuizSession: (state) => {
      state.currentQuizIndex = 0; // Reset index for a new session
    }
  }
});

export const { setDueQuizzes, nextDueQuiz, resetDueQuizSession } = quizzesDueSlice.actions;

export default quizzesDueSlice.reducer;
