import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  id: string;
}

interface NotificationState {
  current: Notification | null;
}

const initialState: NotificationState = {
  current: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.current = action.payload;
    },
    clearNotification: (state) => {
      state.current = null;
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
