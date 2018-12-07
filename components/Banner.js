import styled, { css } from "styled-components";

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: -61px;
  padding: 1rem;
  height: 100vh;

  background-color: ${({ theme }) => theme.color.darklight};
  background-image: url("/static/01.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: -81px;
  }

  ${({ size }) =>
    size
      ? css`
          justify-content: flex-end;
          animation: ${`banner-${size}`} 0.25s forwards;
        `
      : css`
          animation: ${`banner-${size}`} 0.25s forwards reverse;
        `}
`;
