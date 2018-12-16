import React, { Component } from "react";
import styled from "styled-components";

import { Play, Pause } from "./icons";

export class Music extends Component {
  constructor(props) {
    super(props);

    this.state = { play: false };
    this.audio = React.createRef();
  }

  play = () => {
    if (this.state.play) {
      this.setState({ play: false });
      this.audio.current.pause();
    } else {
      this.setState({ play: true });
      this.audio.current.play();
    }
  };

  render() {
    return (
      <StyledMusic>
        <audio controls={false} ref={this.audio}>
          <source src="/static/music.mp3" type="audio/mpeg" />
        </audio>
        <button onClick={this.play}>
          {this.state.play ? <Pause fill="#ffffff" /> : <Play fill="#ffffff" />}
        </button>
      </StyledMusic>
    );
  }
}

const StyledMusic = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 1rem;

  button {
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;

    border-radius: 50%;
    border: 1px solid #c59bb9;
    background-color: #c59bb9;
  }
`;
