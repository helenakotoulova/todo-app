import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorNotification } from "./components/ErrorNotification";
import { FilterTab } from "./components/FilterTab";
import { Form } from "./components/Form";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { TodoList } from "./components/TodoList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { changeTodoStatus, getAllTodosData } from "./store/todos-actions";

const StyledSection = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #f4f0f0;
  padding: 25px 0;
`;

export const statuses = ["All", "Completed", "Incomplete"] as const;
export type Status = typeof statuses[number];

export const App = () => {
  const {
    data: todos,
    loading,
    error,
  } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<Status>("All");

  const selectHandler = () => {
    if (todos.every((todo) => todo.completed)) {
      todos.forEach((todo) => dispatch(changeTodoStatus(todo.id, true)));
    } else {
      const incompleteTodos = todos.filter((todo) => !todo.completed);
      incompleteTodos.forEach((todo) =>
        dispatch(changeTodoStatus(todo.id, todo.completed))
      );
    }
  };

  useEffect(() => {
    dispatch(getAllTodosData());
  }, [dispatch]);

  return (
    <StyledSection>
      <h2 style={{ marginTop: "50px" }}>Todos</h2>
      <Form
        checkedAll={todos.length !== 0 && todos.every((todo) => todo.completed)}
        handleSelect={selectHandler}
      />
      <FilterTab todos={todos} status={status} setStatus={setStatus} />
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorNotification
          errorMessage={error}
          onRetry={() => dispatch(getAllTodosData())}
        />
      )}
      {!loading && !error && (
        <TodoList
          todos={
            status === "All"
              ? todos
              : status === "Completed"
              ? todos.filter((todo) => todo.completed)
              : todos.filter((todo) => !todo.completed)
          }
        />
      )}
    </StyledSection>
  );
};
