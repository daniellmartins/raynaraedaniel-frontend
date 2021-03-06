import styled from "styled-components";

export const SectionTitle = styled.h1`
  font-family: "Tangerine", sans-serif;
  font-size: 2.5em;
  font-weight: 600;
  text-align: center;

  margin: 2rem 0 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5em;
  }
`;
