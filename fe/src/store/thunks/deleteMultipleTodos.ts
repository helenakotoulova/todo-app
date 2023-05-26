import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteTodo } from "./deleteTodo";

export const deleteMultipleTodos = createAsyncThunk<void, string[]>(
  "todos/deleteMultiple",
  async (ids, thunkApi) => {
    ids.forEach((id) => {
      // dummy server does not support delete multiple items in one request
      thunkApi.dispatch(deleteTodo(id));
    });
  }
);
