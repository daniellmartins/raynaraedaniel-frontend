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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4em;

  margin-top: 2em;

  div {
    height: 350px;
    background-color: #d2d2d2;
  }
`;
