import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Container, SectionTitle, Photo } from "../components";
import { Heart } from "../components/icons";

export const Friends = () => (
  <StyledFriends id="friends">
    <SectionTitle>Madrinhas & Padrinhos</SectionTitle>
    <StyledContainer>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Renata" url="/static/renata.jpg" />
        <Photo name="Roberto" url="/static/roberto.jpg" />
      </StyledPhoto>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Beatriz" url="/static/beatriz.jpg" />
        <Photo name="Luan" url="/static/luan.jpg" />
      </StyledPhoto>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Lourrane" url="/static/lourrane.jpg" />
        <Photo name="Rafael" url="/static/rafael.jpg" />
      </StyledPhoto>
      <StyledPhoto>
        <Photo name="Jussara" url="/static/jussara.jpg" />
        <Photo name="Victor" url="/static/victor.jpg" />
      </StyledPhoto>
    </StyledContainer>
  </StyledFriends>
);

const StyledFriends = styled.div`
  padding: 3em 0;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1em;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2em;
  }
`;

const StyledPhoto = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  max-width: 500px;
  padding: 0 5%;
  margin: 1em auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 15%;
    margin: 2em auto;
  }
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -42px;
  margin-left: -27px;
`;
