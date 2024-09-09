import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  practiceHistory: []
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    addPracticeResult: (state, action) => {
      state.practiceHistory.push(action.payload);
    },
    clearPracticeHistory: (state) => {
      state.practiceHistory = [];
    }
  }
});

export const { addPracticeResult, clearPracticeHistory } = practiceSlice.actions;

export default practiceSlice.reducer;
