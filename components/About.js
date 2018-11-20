import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Container, SectionTitle } from "../components";
import { Heart } from "../components/icons";

export const About = () => (
  <StyledAbout>
    <SectionTitle>Sobre nós</SectionTitle>
    <StyledContainer>
      <StyledHeart>
        <Heart fill={theme.color.primary} width={58} height={54} />
      </StyledHeart>
      <Photo name="Raynara" />
      <Photo name="Daniel" />
    </StyledContainer>
  </StyledAbout>
);

const Photo = ({ name }) => (
  <StyledPhoto>
    <img src="/static/photo.svg" alt="" />
    <h1>{name}</h1>
  </StyledPhoto>
);

const StyledAbout = styled.section`
  padding: 1em 0 4em;
  background-color: white;
`;

const StyledContainer = styled(Container)`
  position: relative;

  display: flex;
  justify-content: space-between;
  padding: 0 15%;
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -42px;
  margin-left: -27px;
`;

const StyledPhoto = styled.article`
  text-align: center;

  img {
    width: 100%;
    max-width: 240px;
  }

  h1 {
    font-size: 1em;
    margin: 0;
  }
`;
