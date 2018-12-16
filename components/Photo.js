import React from "react";
import styled from "styled-components";

export const Photo = ({ name, url }) => (
  <StyledPhoto>
    <img src={url} alt="" />
    <h1>{name}</h1>
  </StyledPhoto>
);

const StyledPhoto = styled.article`
  text-align: center;

  img {
    width: 100%;
    max-width: 240px;
    border-radius: 50%;
  }

  h1 {
    font-size: 1em;
    margin: 0;
  }
`;
