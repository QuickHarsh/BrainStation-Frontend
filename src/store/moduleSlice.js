import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
  currentModuleId: null,
  currentModuleName: null,
  currentModuleDescription: null,
  currentLectures: []
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    setCurrentModule: (state, action) => {
      const selectedModule = state.modules.find((module) => module._id === action.payload);
      if (selectedModule) {
        state.currentModuleId = selectedModule._id;
        state.currentModuleName = selectedModule.name;
        state.currentModuleDescription = selectedModule.description;
        state.currentLectures = selectedModule.lectures || [];
      }
    },
    clearCurrentModule: (state) => {
      state.currentModuleId = null;
      state.currentModuleName = null;
      state.currentModuleDescription = null;
      state.currentLectures = [];
    }
  }
});

export const { setModules, setCurrentModule, clearCurrentModule } = moduleSlice.actions;

export default moduleSlice.reducer;
