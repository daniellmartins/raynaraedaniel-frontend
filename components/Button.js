import styled from "styled-components";

export const Button = styled.button`
  color: ${({ theme }) => theme.color.primary};
  font-size: 0.875em;

  padding: ${({ size }) => (size === "small" ? "0.625em 1em" : "0.75em 1em")};
  width: ${({ block }) => (block ? "80%" : "auto")};

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: #ffffff;

  &:hover {
    color: #ffffff;
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:disabled {
    color: #cccccc;
    border-color: #cccccc;

    cursor: default;

    &:hover {
      color: #cccccc;
      background-color: #ffffff;
    }
  }
`;
