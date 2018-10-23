import styled from "styled-components";

export const Container = styled.div`
  padding: 0 16px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoint.lg}) {
    max-width: ${({ theme }) => theme.container.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoint.xl}) {
    max-width: ${({ theme }) => theme.container.xl};
  }
`;
