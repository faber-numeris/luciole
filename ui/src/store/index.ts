import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import { authApi } from './authApi';

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
