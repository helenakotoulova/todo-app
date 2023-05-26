import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoForUpdate } from "../todos-slice";
import { editTodo } from "./editTodo";

export const editMultipleTodos = createAsyncThunk<void, TodoForUpdate[]>(
  "todos/editMultiple",
  async (todos, thunkApi) => {
    // dummy server does not support delete multiple items in one request
    todos.forEach((todo) => thunkApi.dispatch(editTodo(todo)));
  }
);
