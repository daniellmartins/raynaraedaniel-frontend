import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Container, SectionTitle, Photo } from "../components";
import { Heart } from "../components/icons";

export const About = () => (
  <StyledAbout id="history">
    <SectionTitle>Nossa História</SectionTitle>
    <StyledContainer>
      <StyledHeart>
        <Heart fill={theme.color.primary} width={58} height={54} />
      </StyledHeart>
      <Photo name="Raynara" url="/static/raynara@2x.jpg" />
      <Photo name="Daniel" url="/static/daniel@2x.jpg" />
    </StyledContainer>
  </StyledAbout>
);

const StyledAbout = styled.section`
  padding: 3em 0 6em;
  background-color: white;
`;

const StyledContainer = styled(Container)`
  position: relative;

  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 15%;
  }
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -42px;
  margin-left: -27px;
`;
