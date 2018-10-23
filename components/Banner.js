import React from "react";
import styled from "styled-components";

import { Heart } from "../components/icons";

export const Banner = () => (
  <StyledBanner>
    <Heart fill="#bebebe" width={58} height={54} />
  </StyledBanner>
);

const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  background-color: #d2d2d2;
`;
