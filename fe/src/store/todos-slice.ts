import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
}

export interface TodosState {
  loading: boolean;
  error: string | null;
  data: Todo[];
}

const initialState: TodosState = {
  loading: false,
  error: null,
  data: [] as Todo[],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAllTodos: (state, action: PayloadAction<{ todosData: Todo[] }>) => {
      return { data: action.payload.todosData, loading: false, error: null };
    },
    setLoading: (state) => {
      return { data: [], loading: true, error: null };
    },
    setError: (state, action: PayloadAction<{ error: string }>) => {
      return { data: [], loading: false, error: action.payload.error };
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
    },
    addTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.data.unshift(action.payload.todo);
    },
    editTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      const todo = state.data.find(
        (todo) => todo.id === action.payload.todo.id
      );
      if (todo === undefined) {
        state.error = "An error occurred - could not find the edited todo.";
      } else {
        todo.text = action.payload.todo.text;
      }
    },
    changeTodoStatus: (state, action: PayloadAction<{ todo: Todo }>) => {
      const todo = state.data.find(
        (todo) => todo.id === action.payload.todo.id
      );
      if (todo === undefined) {
        state.error = "An error occurred - could not find the edited todo.";
      } else {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice;
