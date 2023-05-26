import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Checkbox, Divider, Paper } from "@mui/material";
import { FC, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";

import { deleteTodo } from "../store/thunks/deleteTodo";
import { editTodo } from "../store/thunks/editTodo";
import { Todo } from "../store/todos-slice";
import { StyledIconButton } from "./StyledComponents/StyledIconButton";
import { TodoItem } from "./TodoItem";

const StyledTodo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  border-bottom: 1px solid lightgrey;
`;

const StyledTodoName = styled.div`
  width: 100%;
  margin-left: 8px;
  font-size: 1rem;
`;

const StyledActions = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    margin-top: 15px;
    padding: 0 5px;
  }
`;

const StyledText = styled.div`
  margin-top: 15px;
  font-size: 0.85rem;
  color: #5f5d5d;
`;

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = (props) => {
  const { todos } = props;
  const [editId, setEditId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const deleteHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const editHandler = (editedTodo: Todo) => {
    dispatch(editTodo(editedTodo));
    setEditId(null);
  };

  return (
    <>
      {todos.length === 0 ? (
        <StyledText>Nothing to display</StyledText>
      ) : (
        <StyledPaper>
          {todos.map((todo) => (
            <StyledTodo key={todo.id}>
              <Checkbox
                icon={
                  <StyledIconButton>
                    <CheckCircleOutlineIcon />
                  </StyledIconButton>
                }
                checkedIcon={
                  <StyledIconButton>
                    <CheckCircleIcon color="success" />
                  </StyledIconButton>
                }
                onChange={() =>
                  editHandler({ ...todo, completed: !todo.completed })
                }
                checked={todo.completed}
              />
              {editId === todo.id ? (
                <TodoItem
                  todoText={todo.text}
                  onEdit={(text) => editHandler({ ...todo, text })}
                />
              ) : (
                <StyledTodoName onDoubleClick={() => setEditId(todo.id)}>
                  {todo.text}
                </StyledTodoName>
              )}
              <StyledActions>
                <StyledIconButton
                  type="button"
                  color="primary"
                  onClick={() => setEditId(todo.id)}
                >
                  <EditIcon />
                </StyledIconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <StyledIconButton
                  type="button"
                  color="error"
                  onClick={() => deleteHandler(todo.id)}
                >
                  <DeleteIcon />
                </StyledIconButton>
              </StyledActions>
            </StyledTodo>
          ))}
        </StyledPaper>
      )}
    </>
  );
};
