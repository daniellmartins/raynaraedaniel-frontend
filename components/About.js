import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Container, SectionTitle } from "../components";
import { Heart } from "../components/icons";

export const About = () => (
  <StyledContainer>
    <SectionTitle>2 de Fevereiro de 2018</SectionTitle>
    <StyledScore>
      <div>
        <h1>08</h1>
        <span>Dias</span>
      </div>
      <div>
        <h1>01</h1>
        <span>Horas</span>
      </div>
      <div>
        <h1>17</h1>
        <span>Minutos</span>
      </div>
      <div>
        <h1>43</h1>
        <span>Segundos</span>
      </div>
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

  margin: 0 0 3em 0;

  width: 100%;
  max-width: 600px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    margin-right: 40px;
    width: 25%;
    height: 100px;

    background-color: #ffffff;

    &:last-child {
      margin-right: 0;
    }

    h1 {
      color: ${({ theme }) => theme.color.primary};
      font-size: 1.875rem;
      font-weight: 600;
      margin: 0;
    }

    span {
      font-size: 0.75rem;
      text-transform: uppercase;
    }
  }
`;

const PhotoWrap = () => (
  <StyledPhotoWrap>
    <StyledHeart>
      <Heart fill={theme.color.primary} width={58} height={54} />
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
