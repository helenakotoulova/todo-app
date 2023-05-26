import { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorNotification } from "./components/ErrorNotification";
import { FilterTab } from "./components/FilterTab";
import { Form } from "./components/Form";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { TodoList } from "./components/TodoList";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectNotifications } from "./store/notification-slice";
import { editTodo } from "./store/thunks/editTodo";
import { getAllTodos } from "./store/thunks/getAllTodos";
import { selectTodos } from "./store/todos-slice";

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
export type Status = (typeof statuses)[number];

const useGetAllTodos = () => {
  const {
    todos = [], // pridano, protoze pokud nefunguje server, tak se vraci undefined misto prazdneho arraye
  } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);

  return todos;
};

export const App = () => {
  const { loading, error } = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();
  const todos = useGetAllTodos();
  const [status, setStatus] = useState<Status>("All");

  const selectHandler = () => {
    const completedStatus = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !completedStatus,
    }));

    updatedTodos.forEach((todo) => dispatch(editTodo(todo)));
  };

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
          onRetry={() => dispatch(getAllTodos())}
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
