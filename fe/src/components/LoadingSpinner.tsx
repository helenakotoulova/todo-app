import styled from "styled-components";

const StyledLoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  margin-top: 30px;

  &::after {
    content: "";
    display: block;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 6px solid #1976d2;
    border-color: #1976d2 transparent #1976d2 transparent;
    animation: load 1.2s linear infinite;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => {
  return <StyledLoadingSpinner />;
};
