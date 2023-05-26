import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../helpers/getErrorMessage";

import { API_BASE_URL } from "../constants/constants";
import { Todo } from "../todos-slice";

// prvni typ je return type, druhy typ je typ toho argumentu, zde todo bude string
export const addTodo = createAsyncThunk<Todo, string>(
  "todos/add",
  async (todo, thunkApi) => {
    try {
      // error test case:
      if (todo === "bad todo") {
        return thunkApi.rejectWithValue("Something bad happened.");
      }

      const response = await axios.post(`${API_BASE_URL}/todos`, {
        id: nanoid(),
        text: todo,
        completed: false,
        createdDate: new Date().getTime(), // getTime() je built-in js fce, ktera vraci number
        //The getTime() method returns the number of milliseconds from midnight of January 1, 1970 (EcmaScript epoch) to the specified date.
      });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(getErrorMessage(e));
    }
  }
);
