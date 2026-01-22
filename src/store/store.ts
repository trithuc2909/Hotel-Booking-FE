import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Thêm reducers vào đây
    // auth: authReducer,
    // room: roomReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
