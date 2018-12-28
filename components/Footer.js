import React from "react";
import styled from "styled-components";

import { Container } from "../components";

export const Footer = () => (
  <StyledFooter>
    <Container>
      <p>
        2018 &copy; Todos os Direitos Reservados <br />
        Raynara e Daniel
      </p>
    </Container>
  </StyledFooter>
);

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 0.75em;

  padding: 3em 0 1em;

  border-top: 1px solid rgba(255, 255, 255, 0.4);
  background-color: #ffffff;
`;
