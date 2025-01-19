import { configureStore } from "@reduxjs/toolkit";
import { artistReducers } from '../features/artists/artistsSlice.ts';
import { albumsReducer } from '../features/albums/albumsSlice.ts';
import { tracksReducer } from '../features/tracks/tracksSlice.ts';
import { usersReducer } from '../features/users/usersSlice.ts';


export const store = configureStore({
  reducer: {
    artists: artistReducers,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
