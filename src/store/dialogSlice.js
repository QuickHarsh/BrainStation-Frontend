import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibleDialogId: null
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      const { dialogId } = action.payload;
      if (!state.visibleDialogId) {
        state.visibleDialogId = dialogId;
      }
    },
    hideDialog: (state, action) => {
      const { dialogId } = action.payload;
      if (state.visibleDialogId === dialogId) {
        state.visibleDialogId = null;
      }
    }
  }
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
