import { configureStore } from "@reduxjs/toolkit";

import activeWorldReducer from "./activeWorld";
import playerReducer from "./player";

const store = configureStore({
  reducer: {
    playerInfo: playerReducer,
    activeWorld: activeWorldReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
