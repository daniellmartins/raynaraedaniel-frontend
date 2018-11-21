import React from "react";
import styled from "styled-components";

export const Photo = ({ name }) => (
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
