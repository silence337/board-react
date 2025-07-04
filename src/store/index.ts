import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import boardReducer from '../features/board/BoardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
