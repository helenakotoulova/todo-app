import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
import { getErrorMessage } from "../helpers/getErrorMessage";

// musela jsem tady pridat do toho return type string | undefined, jinak to na me rvalo, ze ta hodnota return typu nesedi
// ten rejectWithValue vraci i undefined zda se.
export const deleteTodo = createAsyncThunk<string | undefined, string>(
  "todos/delete",
  async (id, thunkApi) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      return id;
    } catch (e) {
      return thunkApi.rejectWithValue(getErrorMessage(e));
    }
  }
);
