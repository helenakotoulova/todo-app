import ReplayIcon from "@mui/icons-material/Replay";
import { Alert, IconButton } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  width: 500px;
  margin-top: 30px;

  &.MuiAlert-root {
    background-color: #f9e4e4;
    display: flex;
    align-items: center;
  }

  & .MuiAlert-message {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

interface Props {
  errorMessage: string;
  onRetry: () => void;
}

export const ErrorNotification: FC<Props> = (props) => {
  const { errorMessage, onRetry } = props;

  return (
    <StyledAlert variant="outlined" severity="error">
      {errorMessage}
      <IconButton onClick={onRetry}>
        <ReplayIcon />
      </IconButton>
    </StyledAlert>
  );
};
