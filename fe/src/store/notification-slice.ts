import {
  PayloadAction,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { getErrorMessage } from "./helpers/getErrorMessage";
import { getAllTodos } from "./thunks/getAllTodos";

export interface NotificationState {
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.pending, (state, action) => {
        // jedina hodne narocna operace, u ostatnich loading stav nechceme zobrazovat
        state.loading = true;
      })
      .addMatcher(isRejected, (state, action: PayloadAction<unknown>) => {
        state.error = getErrorMessage(action.payload);
        state.loading = false;
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const selectNotifications = (state: RootState) => state.notifications;
export default notificationSlice.reducer;
