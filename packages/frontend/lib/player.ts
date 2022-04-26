import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { AppState } from "./store";

interface SliceState {
  player?: { uuid: string; username: string };
  isLoading: boolean;
}
const INITIAL_STATE: SliceState = {
  isLoading: true,
};

const playerSlice = createSlice({
  name: "profileInfo",
  initialState: INITIAL_STATE,
  reducers: {
    setPlayer: (state, action) => {
      if (action.payload.player) {
        state.isLoading = false;
        state.player = {
          username: action.payload.player.username,
          uuid: action.payload.player.uuid,
        };
      } else {
        state.isLoading = true;
      }
    },
  },
});

export const { setPlayer } = playerSlice.actions;
export default playerSlice.reducer;
export const usePlayer = () =>
  useSelector((state: AppState) => state.playerInfo.player!);
export const useIsLoading = () =>
  useSelector((state: AppState) => state.playerInfo.isLoading);
