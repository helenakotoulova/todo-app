import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos-slice";

const store = configureStore({
  reducer: { todos: todosSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
