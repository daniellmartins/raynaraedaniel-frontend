import React, { Component } from "react";
import styled from "styled-components";

import { countDownDate } from "../lib";
import { SectionTitle } from "../components";

export class CountDown extends Component {
  state = { countDown: this.props.countDown };

  componentDidMount() {
    this.countDownInterval = setInterval(() => {
      this.setState({ countDown: countDownDate("2/2/2019 15:00:00") });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }

  render() {
    const { countDown } = this.state;
    return (
      <StyledCountDown>
        <SectionTitle>2 de Fevereiro de 2018</SectionTitle>
        <StyledScore>
          <div>
            <h1>{countDown.days.value}</h1>
            <span>{countDown.days.label}</span>
          </div>
          <div>
            <h1>{countDown.hours.value}</h1>
            <span>{countDown.hours.label}</span>
          </div>
          <div>
            <h1>{countDown.minutes.value}</h1>
            <span>{countDown.minutes.label}</span>
          </div>
          <div>
            <h1>{countDown.seconds.value}</h1>
            <span>{countDown.seconds.label}</span>
          </div>
        </StyledScore>
      </StyledCountDown>
    );
  }
}

const StyledCountDown = styled.div`
  padding: 0 1em;
`;

const StyledScore = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-gap: 2em;
    grid-template-columns: repeat(4, 1fr);
  }

  margin: 3em auto;
  max-width: 600px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

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
