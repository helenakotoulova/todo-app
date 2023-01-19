import { Todo, todosActions } from "./todos-slice";

import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

const URL = "http://localhost:8080";

export const getAllTodosData = (): AppThunk => {
  return async (dispatch) => {
    dispatch(todosActions.setLoading());
    const fetchData = async () => {
      const response = await fetch(`${URL}/tasks`);
      if (!response.ok) {
        throw new Error("Could not fetch todo data!");
      }
      const data: Todo[] = await response.json();
      return data;
    };
    try {
      const todosData = await fetchData();
      dispatch(todosActions.setAllTodos({ todosData }));
    } catch (error) {
      dispatch(todosActions.setError({ error: getErrorMessage(error) }));
    }
  };
};

export const postTodosData = (todo: string): AppThunk => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${URL}/tasks`, {
        method: "POST",
        body: JSON.stringify({ text: todo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Sending todo data failed.");
      }
      const data: Todo = await response.json();
      return data;
    };
    try {
      const todoData = await sendRequest();
      dispatch(todosActions.addTodo({ todo: todoData }));
    } catch (error) {
      dispatch(todosActions.setError({ error: getErrorMessage(error) }));
    }
  };
};

export const deleteTodo = (id: string): AppThunk => {
  return async (dispatch) => {
    const deleteRequest = async () => {
      const response = await fetch(`${URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Deleting todo data failed.");
      }
    };
    try {
      await deleteRequest();
      dispatch(todosActions.deleteTodo({ id }));
    } catch (error) {
      dispatch(todosActions.setError({ error: getErrorMessage(error) }));
    }
  };
};

export const editTodo = (text: string, id: string): AppThunk => {
  return async (dispatch) => {
    const editRequest = async () => {
      const response = await fetch(`${URL}/tasks/${id}`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Editing todo data failed.");
      }
      const data: Todo = await response.json();
      return data;
    };
    try {
      const editedTodo = await editRequest();
      dispatch(todosActions.editTodo({ todo: editedTodo }));
    } catch (error) {
      dispatch(todosActions.setError({ error: getErrorMessage(error) }));
    }
  };
};

export const changeTodoStatus = (id: string, complete: boolean): AppThunk => {
  return async (dispatch) => {
    const editRequest = async () => {
      const response = await fetch(
        `${URL}/tasks/${id}/${complete ? "incomplete" : "complete"}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Changing todo status failed.");
      }
      const data: Todo = await response.json();
      return data;
    };
    try {
      const editedTodo = await editRequest();
      dispatch(todosActions.changeTodoStatus({ todo: editedTodo }));
    } catch (error) {
      dispatch(todosActions.setError({ error: getErrorMessage(error) }));
    }
  };
};
