import React from "react";
import styled from "styled-components";

import { Container } from "../components";

export const Messages = () => (
  <StyledMessages>
    <StyledContainer>
      <div />
    </StyledContainer>
  </StyledMessages>
);

const StyledMessages = styled.div`
  background-color: #d2d2d2;
  background-image: url("/static/02.jpg");
  background-position: 78% center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    background-position: center center;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  padding-top: 9rem;
  padding-bottom: 9rem;

  div {
    width: 540px;
    height: 320px;
    background-color: transparent;
  }
`;
