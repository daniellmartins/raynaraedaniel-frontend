import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Container, SectionTitle, Photo } from "../components";
import { Heart } from "../components/icons";

export const Friends = () => (
  <StyledFriends id="padrinhosemadrinhas">
    <SectionTitle>Padrinhos e Madrinhas</SectionTitle>
    <StyledContainer>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Lourrane" />
        <Photo name="Rafael" />
      </StyledPhoto>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Beatriz" />
        <Photo name="Luan" />
      </StyledPhoto>
      <StyledPhoto>
        <StyledHeart>
          <Heart fill={theme.color.primary} width={58} height={54} />
        </StyledHeart>
        <Photo name="Renata" />
        <Photo name="Roberto" />
      </StyledPhoto>
      <StyledPhoto>
        <Photo name="Jussara" />
        <Photo name="Victor" />
      </StyledPhoto>
    </StyledContainer>
  </StyledFriends>
);

const StyledFriends = styled.div`
  padding: 3em 0;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;
`;

const StyledPhoto = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  padding: 0 15%;
  margin: 2em 0;
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -42px;
  margin-left: -27px;
`;