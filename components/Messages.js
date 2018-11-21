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
`;

const StyledContainer = styled(Container)`
  display: flex;
  padding-top: 6em;
  padding-bottom: 6em;

  div {
    width: 540px;
    height: 320px;
    background-color: #fafafa;
  }
`;
