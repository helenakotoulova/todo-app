import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import notificationSliceReducer from "./notification-slice";
import todosSliceReducer from "./todos-slice";

const store = configureStore({
  reducer: {
    todos: todosSliceReducer,
    notifications: notificationSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
