import React from "react";
import styled, { css, keyframes } from "styled-components";

import {
  Banner,
  CountDown,
  About,
  Messages,
  Galley,
  Friends,
  Footer
} from "../components";
import { countDownDate } from "../lib";

const Home = ({ countDown }) => (
  <React.Fragment>
    <Banner>
      <img src="/static/line_top.png" alt="" />
      <SubTitle>Nós decidimos viver felizes juntos</SubTitle>
      <Title>Ela disse sim</Title>
      <img src="/static/line_bottom.png" alt="" />
    </Banner>
    <CountDown countDown={countDown} />
    <About />
    <Messages />
    <Galley />
    <Friends />
    <Footer />
  </React.Fragment>
);

Home.getInitialProps = () => {
  const countDown = countDownDate("2/2/2019 15:00:00");
  return { countDown };
};

export default Home;

const Title = styled.h1`
  color: #ffffff;
  font-family: "Tangerine", sans-serif;
  font-size: 3.5em;

  margin: 0 0 0.75rem;

  ${true &&
    css`
      animation-name: ${show};
      animation-duration: 0.25s;
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4.5em;
  }
`;

const SubTitle = styled.h2`
  color: #ffffff;
  font-size: 1.2em;
  font-family: "Playfair Display", sans-serif;
  font-style: italic;
  font-weight: 500;

  margin: 1.5em 0 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5em;
  }
`;

const show = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0,-100%,0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
`;
