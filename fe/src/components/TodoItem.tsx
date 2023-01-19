import { ClickAwayListener, InputBase } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  todoText: string;
  onEdit: (text: string) => void;
}

export const TodoItem: FC<Props> = (props) => {
  const { todoText, onEdit } = props;
  const [text, setText] = useState(todoText);

  return (
    <ClickAwayListener onClickAway={() => onEdit(text)}>
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: "1rem" }}
        value={text}
        onChange={(event) => setText(event.target.value)}
        inputRef={(input) => input && input.focus()}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onEdit(text);
          }
        }}
      />
    </ClickAwayListener>
  );
};
