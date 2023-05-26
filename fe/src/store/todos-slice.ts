import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { addTodo } from "./thunks/addTodo";
import { deleteTodo } from "./thunks/deleteTodo";
import { editTodo } from "./thunks/editTodo";
import { getAllTodos } from "./thunks/getAllTodos";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
}

export type TodoForUpdate = Partial<Todo> & Pick<Todo, "id">;

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [] as Todo[],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.todos = action.payload;
        }
      )
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, action: PayloadAction<string | undefined>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      )
      .addCase(editTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      });
  },
});

export const selectTodos = (state: RootState) => state.todos;
export default todosSlice.reducer;
