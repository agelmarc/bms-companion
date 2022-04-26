import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { AppState } from "./store";
import { Dimension } from "types";

const activeWorldSlice = createSlice({
  name: "activeWorld",
  initialState: { type: Dimension.Overworld },
  reducers: {
    setActiveWorld: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setActiveWorld } = activeWorldSlice.actions;
export default activeWorldSlice.reducer;

export const useActiveWorld = () =>
  useSelector((state: AppState) => state.activeWorld.type);
