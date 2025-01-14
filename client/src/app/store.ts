import { configureStore } from "@reduxjs/toolkit";
import { artistReducers } from '../features/artists/artistsSlice.ts';


export const store = configureStore({
  reducer: {
    artists: artistReducers,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
