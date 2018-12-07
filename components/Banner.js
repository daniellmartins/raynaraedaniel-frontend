import styled, { css } from "styled-components";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  height: 100vh;

  background-color: ${({ theme }) => theme.color.darklight};
  background-image: url("/static/01.jpg");
  background-position: 45% center;
  background-size: cover;
  background-repeat: no-repeat;

  ${({ size }) =>
    size
      ? css`
          justify-content: flex-end;
          animation: ${`banner-${size}`} 0.25s forwards ease-out;
        `
      : css`
          animation: ${`banner-small`} 0.25s forwards reverse ease-in;
        `}
`;
