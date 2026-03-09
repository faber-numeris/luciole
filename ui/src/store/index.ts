import { configureStore } from '@reduxjs/toolkit';
import { reducer as notificationsReducer } from 'reapop';
import { authApi } from './authApi';

export const store = configureStore({
    reducer: {
        notifications: notificationsReducer(),
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
