import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '@/store/notificationSlice';
import { authnApi } from '@/store/authnApi';



export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        [authnApi.reducerPath]: authnApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authnApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
