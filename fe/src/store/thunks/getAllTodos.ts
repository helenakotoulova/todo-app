import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../helpers/getErrorMessage";

import { API_BASE_URL } from "../constants/constants";
import { Todo } from "../todos-slice";

export const getAllTodos = createAsyncThunk<Todo[]>(
  "todos/get",
  async (obj, thunkApi) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(getErrorMessage(e));
    }
  }
);
