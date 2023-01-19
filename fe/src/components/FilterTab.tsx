import { Button } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { Status, statuses } from "../App";
import { useAppDispatch } from "../store/hooks";
import { deleteTodo } from "../store/todos-actions";
import { Todo } from "../store/todos-slice";

const StyledButton = styled(Button)`
  &.MuiButton-root {
    text-transform: none;
    font-size: 0.75rem;
    height: 30px;
  }
`;

const StyledSection = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
`;

const StyledNumber = styled.p`
  font-size: 0.75rem;
  color: grey;
`;

interface Props {
  todos: Todo[];
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const FilterTab: FC<Props> = (props) => {
  const { todos, status: selectedStatus, setStatus } = props;
  const completedTodos = todos.filter((todo) => todo.completed);
  const dispatch = useAppDispatch();

  const deleteCompletedTasks = () => {
    completedTodos.forEach((todo) => dispatch(deleteTodo(todo.id)));
  };

  return (
    <StyledSection>
      <StyledNumber>
        {todos.length - completedTodos.length} items left
      </StyledNumber>
      {statuses.map((status, index) => (
        <StyledButton
          key={index}
          variant={selectedStatus === status ? "contained" : "outlined"}
          size="small"
          onClick={() => setStatus(status)}
        >
          {status}
        </StyledButton>
      ))}
      <StyledButton
        variant="outlined"
        size="small"
        disabled={completedTodos.length === 0}
        onClick={deleteCompletedTasks}
      >
        Clear completed
      </StyledButton>
    </StyledSection>
  );
};
