import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { Todo, TodoForUpdate } from "../todos-slice";

export const editTodo = createAsyncThunk<Todo, TodoForUpdate>(
  "todos/edit",
  async ({ text, id, completed, createdDate }, thunkApi) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        text,
        id,
        completed,
        createdDate,
      });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(getErrorMessage(e));
    }
  }
);
