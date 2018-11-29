import styled, { css } from "styled-components";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: -81px;
  height: 100vh;

  background-color: ${({ theme }) => theme.color.darklight};

  ${({ cover }) =>
    cover
      ? css`
          justify-content: flex-end;
          animation: banner 0.25s forwards;
        `
      : css`
          animation: banner 0.25s forwards reverse;
        `}
`;
