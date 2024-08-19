import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMCQPaneVisible: false
};

const mcqSlice = createSlice({
  name: "mcq",
  initialState,
  reducers: {
    showMCQPane: (state) => {
      state.isMCQPaneVisible = true;
    },
    hideMCQPane: (state) => {
      state.isMCQPaneVisible = false;
    }
  }
});

export const { showMCQPane, hideMCQPane } = mcqSlice.actions;

export default mcqSlice.reducer;
