import React from "react";
import styled from "styled-components";

import { theme } from "../config";
import { Heart } from "../components/icons";

export const Banner = () => (
  <StyledBanner>
    <Heart fill={theme.color.primary} width={58} height={54} />
  </StyledBanner>
);

const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #d2d2d2;
  /* background-image: url("static/slide-02.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; */
`;
