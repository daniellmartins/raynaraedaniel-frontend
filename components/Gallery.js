import React from "react";
import styled from "styled-components";

import { Container, SectionTitle } from "../components";

export const Galley = () => (
  <StyledGalley id="nossagaleria">
    <SectionTitle>Nossa Galeria</SectionTitle>
    <StyledContainer>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </StyledContainer>
  </StyledGalley>
);

const StyledGalley = styled.div`
  padding: 3em 0;
`;

const StyledContainer = styled(Container)`
  margin-top: 2em;

  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2em;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-gap: 4em;
  }

  div {
    height: 250px;
    background-color: ${({ theme }) => theme.color.darklight};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 350px;
    }
  }
`;
