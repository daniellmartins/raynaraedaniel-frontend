import React from "react";
import styled from "styled-components";

export const Loading = ({ loading }) => (
  <StyledLoading loading={loading}>
    {loading && (
      <div className="loading">
        <div className="loading-1" />
        <div className="loading-2" />
        <div className="loading-3" />
        <div className="loading-4" />
      </div>
    )}
  </StyledLoading>
);

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2010;

  pointer-events: none;
  transform-origin: 50% 0%;
  transform: ${({ loading }) => (loading ? "scaleY(1)" : "scaleY(0)")};
  transition: transform 0.2s ease;

  .loading {
    position: relative;
    height: 2px;

    div {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform-origin: 0% 0%;
      transform: scaleX(0);
    }
  }

  .loading-1 {
    background-color: ${({ theme }) => theme.color.primary};
    animation: progress-indeterminate-1 2.5s linear infinite;
    z-index: 1;
  }

  .loading-2 {
    background-color: #ffffff;
    animation: progress-indeterminate-2 2.5s ease-in infinite;
    z-index: 2;
  }
  .loading-3 {
    background-color: ${({ theme }) => theme.color.primary};
    animation: progress-indeterminate-3 2.5s ease-out infinite;
    z-index: 3;
  }
  .loading-4 {
    background-color: #ffffff;
    animation: progress-indeterminate-4 2.5s ease-out infinite;
    z-index: 4;
  }
`;
