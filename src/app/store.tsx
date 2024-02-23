import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import audienceSlice from "../features/audienceSlice";




const store = configureStore({
  reducer: {
    audience: audienceSlice,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;