import React from "react";
import styled from "styled-components";

import { Container } from "../components";

export const Messages = () => (
  <StyledMessages>
    <StyledContainer>
      <div>
        <p>
          Deus tem um propósito para tudo e nas nossas vidas não foi diferente,
          muitas coisas mudaram para podermos nos encontrar. Nosso namoro foi
          resumido em amor, respeito e parceria e apesar dos momentos distantes,
          entre várias viagens de Santa Cruz à Esperança e João Pessoa à
          Esperança, sempre nos encontrávamos com um sorriso no rosto e muito
          amor. Chegou a hora de realizarmos nosso sonho e unirmos nossas vidas,
          nossos sonhos e nossos propósitos.
        </p>
      </div>
    </StyledContainer>
  </StyledMessages>
);

const StyledMessages = styled.div`
  background-color: #d2d2d2;
  background-image: url("/static/02@2x.jpg");
  background-position: bottom center;
  background-size: contain;
  background-repeat: no-repeat;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    background-position: right center;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  padding-top: 3rem;
  padding-bottom: 15rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 9rem;
    padding-bottom: 9rem;
  }

  div {
    padding: 3rem 2rem;
    text-align: center;
    width: 540px;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
