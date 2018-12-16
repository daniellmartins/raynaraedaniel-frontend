import React from "react";
import styled from "styled-components";

import { checkLoggedIn } from "../lib";
import {
  Page,
  Meta,
  Header,
  Banner,
  Footer,
  Container,
  Cart as MyCart,
  CartList
} from "../components";

export default function Cart({ me }) {
  return (
    <Page>
      <Meta />
      <Header />
      {me && <MyCart />}
      <Banner size="medium">
        <Title>Carrinho de Compras</Title>
      </Banner>
      <StyledCart>
        <StyledContainer>
          <CartList />
        </StyledContainer>
      </StyledCart>
      <Footer />
    </Page>
  );
}

Cart.getInitialProps = async ({ apolloClient }) => {
  const { me } = await checkLoggedIn(apolloClient);
  return { ...me };
};

const Title = styled.h1`
  color: #ffffff;
  font-family: "Tangerine", sans-serif;
  font-size: 2.5em;

  padding-top: 80px;
  margin: 2rem 0 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.5em;
  }
`;

const StyledCart = styled.div`
  background-color: #ffffff;
  animation: banner-medium 0.25s forwards;

  padding: 3rem 0;
`;

const StyledContainer = styled(Container)`
  max-width: 600px;
`;
