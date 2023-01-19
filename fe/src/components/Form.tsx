import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button, Checkbox, InputBase, Paper } from "@mui/material";
import { FC, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks";
import { postTodosData } from "../store/todos-actions";
import { StyledIconButton } from "./StyledComponents/StyledIconButton";

const StyledPaper = styled(Paper)`
  &.MuiPaper-root {
    display: flex;
    align-items: center;
    width: 500px;
    padding: 0 5px;
  }
`;

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    padding: 16px;
    margin-right: -5px;
    height: 100%;
    border-radius: 0 4px 4px 0;
  }
`;

interface Props {
  handleSelect: () => void;
  checkedAll: boolean;
}

export const Form: FC<Props> = (props) => {
  const { checkedAll, handleSelect } = props;
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const addTodoHandler = () => {
    dispatch(postTodosData(value));
    setValue("");
  };

  return (
    <StyledPaper>
      <Checkbox
        checked={checkedAll}
        indeterminate={!checkedAll}
        onChange={handleSelect}
        icon={
          <StyledIconButton aria-label="all-done">
            <DoneAllIcon />
          </StyledIconButton>
        }
        checkedIcon={
          <StyledIconButton aria-label="all-done">
            <DoneAllIcon color="success" />
          </StyledIconButton>
        }
        indeterminateIcon={
          <StyledIconButton aria-label="all-done">
            <DoneAllIcon />
          </StyledIconButton>
        }
      />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add a new todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <StyledButton onClick={addTodoHandler} variant="contained">
        Add new
      </StyledButton>
    </StyledPaper>
  );
};
