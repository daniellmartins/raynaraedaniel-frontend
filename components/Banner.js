import styled, { css, keyframes } from "styled-components";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: -80px;
  height: 100vh;

  background-color: ${({ theme }) => theme.color.darklight};

  ${({ cover }) =>
    cover
      ? css`
          animation-name: ${small};
          animation-duration: 0.25s;
          animation-fill-mode: forwards;
        `
      : css`
          animation-name: ${large};
          animation-duration: 0.25s;
          animation-fill-mode: forwards;
        `} /* background-image: url("");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; */
`;

const small = keyframes`
  0% {
    height: 100vh;
  }

  100% {
    height: 300px;
  }
`;

const large = keyframes`
  0% {
    height: 300px;
  }

  100% {
    height: 100vh;
  }
`;
