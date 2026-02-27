import { configureStore } from "@reduxjs/toolkit";
import { MessageSlice } from "./MessageSlice";
import TokenSliceReducer from "./TokenSlice";

export const store = configureStore({
  reducer: {
    message: MessageSlice.reducer,
    accessToken: TokenSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
