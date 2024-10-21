import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dueQuizzes: [],
  currentQuizIndex: 0,
  shouldRefreshQuizzes: false
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
    },
    triggerQuizRefresh: (state) => {
      state.shouldRefreshQuizzes = !state.shouldRefreshQuizzes;
    }
  }
});

export const { setDueQuizzes, nextDueQuiz, resetDueQuizSession, triggerQuizRefresh } = quizzesDueSlice.actions;

export default quizzesDueSlice.reducer;
