import React from "react";
import styled from "styled-components";

import { Container, SectionTitle } from "../components";

export const Galley = () => (
  <StyledGalley id="gallery">
    <SectionTitle>Nossa Galeria</SectionTitle>
    <StyledContainer>
      <img src="/static/03@2x.jpg" alt="Raynara e Daniel 03" />
      <img src="/static/04@2x.jpg" alt="Raynara e Daniel 04" />
      <img src="/static/05@2x.jpg" alt="Raynara e Daniel 05" />
      <img src="/static/06@2x.jpg" alt="Raynara e Daniel 06" />
      <img src="/static/07@2x.jpg" alt="Raynara e Daniel 07" />
      <img src="/static/08@2x.jpg" alt="Raynara e Daniel 08" />
      <img src="/static/09@2x.jpg" alt="Raynara e Daniel 09" />
      <img src="/static/10@2x.jpg" alt="Raynara e Daniel 10" />
      <img src="/static/11@2x.jpg" alt="Raynara e Daniel 11" />
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

  img {
    width: 100%;
    /* height: 250px; */

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      /* height: 350px; */
    }
  }
`;
