import React from "react";
import styled from "styled-components";

export const ProductHeader = () => <StyledProductHeader />;

const StyledProductHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  padding: 1em 0;
`;
