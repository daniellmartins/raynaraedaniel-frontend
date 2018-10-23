import React from "react";
import styled from "styled-components";

import { Container, SectionTitle } from "../components";
import { Heart } from "../components/icons";

export const About = () => (
  <StyledContainer>
    <StyledScore>
      <div />
      <div />
      <div />
      <div />
    </StyledScore>
    <SectionTitle>Sobre nós</SectionTitle>

    <PhotoWrap />
  </StyledContainer>
);

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 200px;
`;

const StyledScore = styled.div`
  display: flex;
  justify-content: center;
  margin: 10em 0 2.5em 0;

  width: 100%;
  max-width: 600px;

  div {
    margin-right: 40px;
    width: 25%;
    height: 100px;

    background-color: #d2d2d2;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const PhotoWrap = () => (
  <StyledPhotoWrap>
    <StyledHeart>
      <Heart fill="#bebebe" width={58} height={54} />
    </StyledHeart>
    <Photo name="Raynara" />
    <Photo name="Daniel" />
  </StyledPhotoWrap>
);

const StyledPhotoWrap = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 820px;
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -42px;
  margin-left: -27px;
`;

const Photo = ({ name }) => (
  <StyledPhoto>
    <img src="/static/photo.svg" alt="" />
    <h1>{name}</h1>
  </StyledPhoto>
);

const StyledPhoto = styled.article`
  color: #d2d2d2;
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
